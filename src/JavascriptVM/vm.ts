import Interpreter from "js-interpreter";

export class BlocklyInterpreter {
  private interpreter: Interpreter;
  private pause: boolean;

  constructor(
    code: string,
    callbacks: {
      onHighlight: (id: string) => void;
    }
  ) {
    this.pause = false;

    this.interpreter = new Interpreter(code, (interpreter, globals) => {
      const highlightBlock = interpreter.createNativeFunction((id: string) => {
        this.pause = true;
        callbacks.onHighlight(id);
      });

      const alert = interpreter.createNativeFunction((text: string) => {
        console.log("VM > " + text);
      });

      interpreter.setProperty(globals, "alert", alert);
      interpreter.setProperty(globals, "highlightBlock", highlightBlock);
    });
  }

  step(): void {
    while (this.interpreter.step() && !this.pause);

    this.pause = false;
  }

  run(): boolean {
    return this.interpreter.run();
  }
}
