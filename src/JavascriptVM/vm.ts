import Interpreter from "js-interpreter";

export type BlocklyInterpreterCallbacks = {
  onHighlight: (id: string) => void;
  onSetDcMotorPower: (port: number, power: number) => void;
  onIsSensorTouchPushed: (port: number) => boolean;
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
        (port: number, power: number) => {
          this.pause = true;
          callbacks.onSetDcMotorPower(port, power);
        }
      );

      const isSensorTouchPushed = interpreter.createNativeFunction(
        (port: number, power: number) => {
          this.pause = true;
          return callbacks.onIsSensorTouchPushed(port);
        }
      );

      interpreter.setProperty(globals, "alert", alert);
      interpreter.setProperty(globals, "highlightBlock", highlightBlock);
      interpreter.setProperty(globals, "setDcMotorPower", setDcMotorPower);
      interpreter.setProperty(
        globals,
        "isSensorTouchPushed",
        isSensorTouchPushed
      );
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
