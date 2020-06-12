import Interpreter from "js-interpreter";

export type BlocklyInterpreterCallbacks = {
  onHighlight: (id: string) => void;
  onSetDcMotorPower: (port: number, forward: boolean, power: number) => void;
};

export class BlocklyInterpreter {
  private interpreter: Interpreter;
  private pause: boolean;
  private callbacks: BlocklyInterpreterCallbacks;

  constructor(code: string, callbacks: BlocklyInterpreterCallbacks) {
    this.pause = false;
    this.callbacks = callbacks;

    this.interpreter = new Interpreter(code, (interpreter, globals) => {
      const highlightBlock = interpreter.createNativeFunction((id: string) => {
        this.pause = true;
        callbacks.onHighlight(id);
      });

      const alert = interpreter.createNativeFunction((text: string) => {
        console.log("VM > " + text);
      });

      const setDcMotorPower = interpreter.createNativeFunction(
        (port: number, forward: boolean, power: number) => {
          this.pause = true;
          callbacks.onSetDcMotorPower(port, forward, power);
        }
      );

      interpreter.setProperty(globals, "alert", alert);
      interpreter.setProperty(globals, "highlightBlock", highlightBlock);
      interpreter.setProperty(globals, "setDcMotorPower", setDcMotorPower);
    });
  }

  step(): boolean {
    let finished = false;
    while (!this.pause && !finished) {
      finished = !this.interpreter.step();
    }

    this.pause = false;

    return finished;
  }

  run(): boolean {
    return this.interpreter.run();
  }
}
