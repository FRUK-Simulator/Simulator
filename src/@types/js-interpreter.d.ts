declare module "js-interpreter" {
  type GlobalObject = object;

  /**
   * The Interpreter class is responsible for loading and executing sandboxed javascript code. See https://neil.fraser.name/software/JS-Interpreter/docs.html
   * for full and complete documentation.
   */
  export class Interpreter {
    /**
     * Creates an instance of a sandboxed interpreter with the provided code. An initFunction may also
     * be provided to initialize the sandbox with variables or functions.
     *
     * @param code the initial code to learn into the interpreter
     */
    constructor(
      code: string,
      initFunction?: (
        interpreter: Interpreter,
        globalObject: GlobalObject
      ) => void
    );

    /**
     * Sets a variable accessible by the sandboxed JS. Provides a way for the sandboxed code to call out
     * to the host code.
     *
     * @param globalObject the GlobalObject from the initFunction
     * @param key the variable name of the value
     * @param value the value of the variable
     *
     * @example
     * ```js
     * var myCode = 'alert(url);';
     * var initFunc = function(interpreter, globalObject) {
     *   interpreter.setProperty(globalObject, 'url', String(location));
     *
     *   var wrapper = function(text) {
     *     return alert(text);
     *   };
     *   interpreter.setProperty(globalObject, 'alert', interpreter.createNativeFunction(wrapper));
     * };
     * var myInterpreter = new Interpreter(myCode, initFunc);
     * ```
     */
    setProperty(globalObject: GlobalObject, key: string, value: any);

    /**
     * Creates a function that can be inserted into the sandbox and be called from it.
     *
     * @param wrapper the function to create a native instance of
     *
     * @returns a function that is insertable into the sandbox
     */
    createNativeFunction(wrapper: function): function;

    /**
     * Appends new code to the interpreter.
     *
     * @param code new code to be added to the interpreter
     */
    appendCode(code: string);

    /**
     * Executes the next single line of code.
     */
    step();

    /**
     * Runs the code in its entirety. In cases where the code encounters asynchronous API calls,
     * run will return true if it is blocked and needs to be reexecuted at a later time.
     *
     * @returns true if needs to be re-called due to asynchronous code, false otherwise.
     */
    run(): boolean;
  }

  export = Interpreter;
}
