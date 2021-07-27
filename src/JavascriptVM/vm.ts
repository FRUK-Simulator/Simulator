import Interpreter from "js-interpreter";
import { ControllerKey } from "../state/gameControllerSlice";
import { ArenaColourConstants } from "./colourSensorConstants";
import { DISTANCE_SENSOR_RANGE } from "./distanceSensorConstants";

export type BlocklyInterpreterCallbacks = {
  /**
   * Called when the vm encounter a "higlightBlock" function call
   */
  onHighlight?: (id: string) => void;

  /**
   * Sets the output power
   */
  onSetMotorPower?: (channel: number, power: number) => void;

  /**
   * Sets an exposed mechanism's value for a given channel
   */
  onSetDigitalOutput?: (channel: number, value: boolean) => void;

  /**
   * Get the value for a given digital channel
   */
  onGetDigitalInput?: (channel: number) => boolean;

  /**
   * Called when there is nothing left to execute or the vm has been stopped
   */
  onFinish?: () => void;

  onIsSensorTouchPushed?: (port: number) => boolean;

  /**
   * Called on key press check. Returns true if the key is currently pressed
   */
  onControllerKeyCheck?: (key: ControllerKey) => boolean;

  /**
   * Gets the value of the given sensor on the curent robot. value is between 0.0 and 1.0.
   */
  getSensorValue?: (port: number) => number;
  getComplexSensorValue?: (port: number, type: string) => any;
};

export enum ExecutionState {
  /** Represents when the VM has not been created yet */
  NONE = "none",
  /** Represents when the VM has begun running on an interval */
  RUNNING = "running",
  /** Represents when the VM has been stopped and the state has been cleared */
  STOPPED = "stopped",
  /** Execution is paused but the state is saved and code is still loaded */
  PAUSED = "paused",
}

export enum ExecutionSpeed {
  SLOW = 2,
  FAST = 100,
}

export enum CameraView {
  POSITION = 1,
  THIRD_PERSON = 2,
  ORBIT = 3,
}

const MIN_EXECUTION_INTERVAL = 10; // minimum milliseconds between execution

export class BlocklyInterpreter {
  private interpreter: Interpreter;
  private executionState: ExecutionState;
  private blockHighlighted: boolean;
  private callbacks: BlocklyInterpreterCallbacks;
  private nextStepDelay: number;
  private executionInterval: number;
  private stepsPerExecution: number;
  private highlightBlocks: boolean;

  constructor(
    code: string,
    speed: ExecutionSpeed,
    callbacks: BlocklyInterpreterCallbacks
  ) {
    this.executionState = ExecutionState.PAUSED;
    this.callbacks = callbacks;
    this.blockHighlighted = false;
    this.nextStepDelay = 0;
    this.executionInterval = 0;
    this.stepsPerExecution = 0;
    this.highlightBlocks = false;

    this._computeExecutionSpeed(speed);

    this.interpreter = new Interpreter(code, (interpreter, globals) => {
      const highlightBlock = interpreter.createNativeFunction((id: string) => {
        this.blockHighlighted = true;

        if (this.highlightBlocks) {
          callbacks.onHighlight && callbacks.onHighlight(id);
        }
      });

      const alert = interpreter.createNativeFunction((text: string) => {
        console.log("VM > " + text);
      });

      const setMotorPower = interpreter.createNativeFunction(
        (port: number, power: number) => {
          if (callbacks.onSetMotorPower) {
            // normalize power from percentage to range -1 to 1
            callbacks.onSetMotorPower(port, power / 100);
          }
        }
      );

      const setDigitalOutput = interpreter.createNativeFunction(
        (channel: number, value: boolean) => {
          if (callbacks.onSetDigitalOutput) {
            callbacks.onSetDigitalOutput(channel, value);
          }
        }
      );

      const getDigitalInput = interpreter.createNativeFunction(
        (channel: number): boolean => {
          if (callbacks.onGetDigitalInput) {
            return callbacks.onGetDigitalInput(channel);
          }

          return false;
        }
      );

      const isSensorTouchPushed = interpreter.createNativeFunction(
        (port: number) => {
          if (callbacks.onIsSensorTouchPushed) {
            return callbacks.onIsSensorTouchPushed(port);
          }
        }
      );

      const getSensorValue = interpreter.createNativeFunction(
        (port: number): number => {
          if (callbacks.getSensorValue) {
            return callbacks.getSensorValue(port);
          }
          return 0.0;
        }
      );

      const getComplexSensorValue = interpreter.createNativeFunction(
        (port: number, type: string): any => {
          if (callbacks.getComplexSensorValue) {
            return interpreter.nativeToPseudo(
              callbacks.getComplexSensorValue(port, type)
            );
          }
          return {};
        }
      );

      const waitWrapper = interpreter.createNativeFunction(
        (milliseconds: number) => {
          this.nextStepDelay = milliseconds;
        }
      );

      const checkGamepadKeyPress = interpreter.createNativeFunction(
        (key: ControllerKey) => {
          if (callbacks.onControllerKeyCheck) {
            return callbacks.onControllerKeyCheck(key);
          }
        }
      );

      const sensorConversionFactor = interpreter.createNativeFunction(
        (unit: string) => {
          if (unit === "centimeters") {
            return DISTANCE_SENSOR_RANGE * 100.0;
          } else if (unit === "meters") {
            return DISTANCE_SENSOR_RANGE;
          }

          return DISTANCE_SENSOR_RANGE;
        }
      );

      const colorSensorConversion = interpreter.createNativeFunction(
        (color: string) => {
          if (color === "red") {
            return ArenaColourConstants.RED;
          } else if (color === "blue") {
            return ArenaColourConstants.BLUE;
          } else if (color === "green") {
            return ArenaColourConstants.GREEN;
          }
          return 0;
        }
      );

      interpreter.setProperty(globals, "alert", alert);
      interpreter.setProperty(globals, "highlightBlock", highlightBlock);
      interpreter.setProperty(globals, "setMotorPower", setMotorPower);
      interpreter.setProperty(globals, "setDigitalOutput", setDigitalOutput);
      interpreter.setProperty(globals, "getDigitalInput", getDigitalInput);
      interpreter.setProperty(
        globals,
        "isSensorTouchPushed",
        isSensorTouchPushed
      );
      interpreter.setProperty(globals, "getSensorValue", getSensorValue);
      interpreter.setProperty(
        globals,
        "getComplexSensorValue",
        getComplexSensorValue
      );
      interpreter.setProperty(globals, "wait", waitWrapper);
      interpreter.setProperty(
        globals,
        "checkGamepadKeyPress",
        checkGamepadKeyPress
      );
      interpreter.setProperty(
        globals,
        "sensorConversionFactor",
        sensorConversionFactor
      );
      interpreter.setProperty(
        globals,
        "colorSensorConversion",
        colorSensorConversion
      );
    });

    // Start running in a paused state - ie, spawn a "thread"
    this._run(0);
  }

  private _computeExecutionSpeed(speed: ExecutionSpeed): void {
    // Calling 'setTimeout' more than say '10' times per second is ill advisable, so we need to adjust the frequency
    const executionInterval = Math.max(
      MIN_EXECUTION_INTERVAL,
      1000 * (1 / speed)
    ); // milliseconds between execution
    const executionFrequency = 1000 / executionInterval;

    // Now we must re compute the number of steps we need per each 'setTimeout' call.
    // N.b. this may eventually be fractional, if say we have a max execution interval or a fractional number of steps per second.
    this.stepsPerExecution = speed / executionFrequency;
    this.executionInterval = executionInterval;

    this.highlightBlocks = speed === ExecutionSpeed.SLOW;
  }

  /**
   * Set the VM execution speed for a currently active VM
   */
  setSpeed(speed: ExecutionSpeed): void {
    this._computeExecutionSpeed(speed);
  }

  /**
   * Executes a "block" of work. If there is no more work to be executed, stops execution and
   * fires the "onFinished" callback if present. This is the main function that should be called
   * to execute code on the VM.
   */
  private _step(): boolean {
    let finished = false;
    this.blockHighlighted = false;
    while (!this.blockHighlighted && this.nextStepDelay === 0 && !finished) {
      finished = !this.interpreter.step();
    }
    this.blockHighlighted = false;

    if (finished) {
      // put the VM into a "stopped" state
      this.stop();

      // alert the client of the VM that execution is finished if there is a cb registered
      this.callbacks.onFinish && this.callbacks.onFinish();
    }

    return finished;
  }

  /**
   * Steps execution by one block if there is code left to execute. Returns true if there is more to execute, false otherwise.
   */
  step(): boolean {
    // do not step an already running program
    if (this.executionState === ExecutionState.RUNNING) {
      return true;
    }

    // if stopped, do nothing.
    if (this.executionState === ExecutionState.STOPPED) {
      return false;
    }

    return this._step();
  }

  /**
   * Continually steps the program at a cadence until there is nothing left to run or until the user stops the VM.
   */
  private _run(steps: number) {
    let timeout = this.executionInterval;

    if (this.nextStepDelay > this.executionInterval) {
      timeout = this.nextStepDelay;
      this.nextStepDelay = 0;
    }

    setTimeout(() => {
      // do not schedule any more work if stopped
      if (this.executionState === ExecutionState.STOPPED) {
        return;
      }

      // if paused - schedule the next frame
      if (this.executionState === ExecutionState.PAUSED) {
        return this._run(steps);
      }

      // Add however many (maybe fractional) steps we are instructed to complete
      steps += this.stepsPerExecution;

      for (let i = 0; i < steps; i++) {
        this._step();
      }

      // Figure out how many (fractional) steps we didn't complete
      let remainder = steps % 1;

      // schedule the next run
      return this._run(remainder);
    }, timeout);
  }

  run() {
    // unpause the execution
    this.unpause();
  }

  /**
   * Pauses execution if the vm is running.
   */
  pause() {
    if (this.executionState === ExecutionState.RUNNING) {
      this.executionState = ExecutionState.PAUSED;
    }
  }

  /**
   * Unpauses execution if the vm is paused
   */
  unpause() {
    if (this.executionState === ExecutionState.PAUSED) {
      this.executionState = ExecutionState.RUNNING;
    }
  }

  /**
   * Permanently stops the execution. Triggers the "onFinished" callback.
   */
  stop() {
    this.executionState = ExecutionState.STOPPED;
  }

  /**
   * Returns the state of the VM.
   *
   * @see ExecutionState
   */
  getExecutionState() {
    return this.executionState;
  }
}
