import Interpreter from "js-interpreter";

export type BlocklyInterpreterCallbacks = {
  onHighlight: (id: string) => void;
};

const BLOCKS_PER_FRAME = 1;
enum ExecutionState {
  run = "running",
  paused = "paused",
  stopped = "stopped",
}

export class BlocklyInterpreter {
  private interpreter: Interpreter;
  private executionState: ExecutionState;
  private blockHighlighted: boolean;
  private callbacks: BlocklyInterpreterCallbacks;

  constructor(code: string, callbacks: BlocklyInterpreterCallbacks) {
    this.executionState = ExecutionState.run;
    this.callbacks = callbacks;
    this.blockHighlighted = false;

    this.interpreter = new Interpreter(code, (interpreter, globals) => {
      const highlightBlock = interpreter.createNativeFunction((id: string) => {
        this.blockHighlighted = true;
        callbacks.onHighlight(id);
      });

      const alert = interpreter.createNativeFunction((text: string) => {
        console.log("VM > " + text);
      });

      interpreter.setProperty(globals, "alert", alert);
      interpreter.setProperty(globals, "highlightBlock", highlightBlock);
    });
  }

  step(): boolean {
    let finished = false;
    this.blockHighlighted = false;
    while (!this.blockHighlighted && !finished) {
      finished = !this.interpreter.step();
    }
    this.blockHighlighted = false;

    return finished;
  }

  run(): Promise<void> {
    // do not schedule any more work if stopped
    if (this.executionState === ExecutionState.stopped) {
      return Promise.resolve();
    }

    return new Promise((res) => {
      setTimeout(() => {
        // if paused - schedule the next frame
        if (this.executionState === ExecutionState.paused) {
          return res(this.run());
        }

        for (let cnt = 0; cnt < BLOCKS_PER_FRAME; cnt++) {
          const finished = this.step();

          // execution has finished - do not schedule more work
          if (finished) {
            // prevent future runs
            this.stop();

            return res();
          }
        }

        // more to execute - schedule the next task
        return res(this.run());
      }, 500);
    });
  }

  /**
   * Pauses execution after calling "run".
   */
  pause() {
    this.executionState = ExecutionState.paused;
  }

  /**
   * Unpauses execution after calling "run".
   */
  unpause() {
    this.executionState = ExecutionState.run;
  }

  /**
   * Permanently stop the execution
   */
  stop() {
    this.executionState = ExecutionState.stopped;
  }
}
