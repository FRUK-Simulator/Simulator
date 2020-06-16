import Interpreter from "js-interpreter";

export type BlocklyInterpreterCallbacks = {
  /**
   * Called when the vm encounter a "higlightBlock" function call
   */
  onHighlight?: (id: string) => void;
  /**
   * Called when there is nothing left to execute or the vm has been stopped
   */
  onFinish?: () => void;
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

const BLOCKS_PER_SECOND = 1;

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

      interpreter.setProperty(globals, "alert", alert);
      interpreter.setProperty(globals, "highlightBlock", highlightBlock);
    });

    // Start running in a paused state - ie, spawn a "thread"
    this._run();
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
  private _run() {
    // do not schedule any more work if stopped
    if (this.executionState === ExecutionState.STOPPED) {
      return;
    }

    setTimeout(() => {
      // if paused - schedule the next frame
      if (this.executionState === ExecutionState.PAUSED) {
        return this._run();
      }

      this._step();

      // schedule the next run
      return this._run();
    }, 1000 / BLOCKS_PER_SECOND);
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
