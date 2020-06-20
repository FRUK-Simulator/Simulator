import Interpreter from "js-interpreter";

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
   * Called when there is nothing left to execute or the vm has been stopped
   */
  onFinish?: () => void;

  onIsSensorTouchPushed?: (port: number) => boolean;
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

// This is the tunable. How many steps on the vm do we want to execute per second.
const STEPS_FREQUENCY = 5; // Hz

// Calling 'setTimeout' more than say '10' times per second is ill advisable, so we need to adjust the frequency
const MIN_EXECUTION_INTERVAL = 10; // minimum milliseconds between execution
const EXECUTION_INTERVAL = Math.max(
  MIN_EXECUTION_INTERVAL,
  1000 * (1 / STEPS_FREQUENCY)
); // milliseconds between execution
const EXECUTION_FREQUENCY = 1000 / EXECUTION_INTERVAL;

// Now we must re compute the number of steps we need per each 'setTimeout' call.
// N.b. this may eventually be fractional, if say we have a max execution interval or a fractional number of steps per second.
const STEPS_PER_EXECUTION = STEPS_FREQUENCY / EXECUTION_FREQUENCY;

export class BlocklyInterpreter {
  private interpreter: Interpreter;
  private executionState: ExecutionState;
  private blockHighlighted: boolean;
  private callbacks: BlocklyInterpreterCallbacks;

  constructor(code: string, callbacks: BlocklyInterpreterCallbacks) {
    this.executionState = ExecutionState.PAUSED;
    this.callbacks = callbacks;
    this.blockHighlighted = false;

    this.interpreter = new Interpreter(code, (interpreter, globals) => {
      const highlightBlock = interpreter.createNativeFunction((id: string) => {
        this.blockHighlighted = true;
        callbacks.onHighlight && callbacks.onHighlight(id);
      });

      const alert = interpreter.createNativeFunction((text: string) => {
        console.log("VM > " + text);
      });

      const setMotorPower = interpreter.createNativeFunction(
        (port: number, power: number) => {
          if (callbacks.onSetMotorPower) {
            callbacks.onSetMotorPower(port, power);
          }
        }
      );

      const isSensorTouchPushed = interpreter.createNativeFunction(
        (port: number) => {
          if (callbacks.onIsSensorTouchPushed) {
            return callbacks.onIsSensorTouchPushed(port);
          }
        }
      );

      interpreter.setProperty(globals, "alert", alert);
      interpreter.setProperty(globals, "highlightBlock", highlightBlock);
      interpreter.setProperty(globals, "setMotorPower", setMotorPower);
      interpreter.setProperty(
        globals,
        "isSensorTouchPushed",
        isSensorTouchPushed
      );
    });

    // Start running in a paused state - ie, spawn a "thread"
    this._run(0);
  }

  /**
   * Executes a "block" of work. If there is no more work to be executed, stops execution and
   * fires the "onFinished" callback if present. This is the main function that should be called
   * to execute code on the VM.
   */
  private _step(): boolean {
    let finished = false;
    this.blockHighlighted = false;
    while (!this.blockHighlighted && !finished) {
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
      steps += STEPS_PER_EXECUTION;

      for (let i = 0; i < steps; i++) {
        this._step();
      }

      // Figure out how many (fractional) steps we didn't complete
      let remainder = steps % 1;

      // schedule the next run
      return this._run(remainder);
    }, EXECUTION_INTERVAL);
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
