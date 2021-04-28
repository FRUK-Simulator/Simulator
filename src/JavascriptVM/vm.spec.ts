import { BlocklyInterpreter, ExecutionState, ExecutionSpeed } from "./vm";
import { version } from "process";

jest.useFakeTimers("modern");

describe("javascript vm", () => {
  let speed: ExecutionSpeed;

  beforeEach(() => {
    speed = ExecutionSpeed.SLOW;
  });

  it("calls the highlightBlock callback", () => {
    const code = "highlightBlock('abc');";
    const onHighlightFn = jest.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onHighlight: onHighlightFn,
    });

    vm.step();

    expect(onHighlightFn).toBeCalledWith("abc");
  });

  test("step runs the code until it hits a highlightBlock statement", () => {
    const code = `
    var a = 1;
    var b = 2;
    highlightBlock(a + b);
    var c = 3;
    highlightBlock(a + b + c);
    `;
    const onHighlightFn = jest.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onHighlight: onHighlightFn,
    });

    vm.step();

    expect(onHighlightFn).toBeCalledWith(3);
    expect(onHighlightFn).not.toBeCalledWith(6);

    vm.step();

    expect(onHighlightFn).toBeCalledWith(6);
  });

  test("it calls the onFinished callback when there is nothing left to execute", () => {
    const code = `
    for(var i = 0; i < 10; i++);
    highlightBlock("a");
    for(var i = 0; i < 10; i++);
    `;
    const onFinishedFn = jest.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onFinish: onFinishedFn,
    });

    vm.step();

    expect(onFinishedFn).not.toBeCalled();

    vm.step();

    expect(onFinishedFn).toBeCalled();
  });

  test("step does not run code when the vm has been stopped", () => {
    const code = "highlightBlock('abc');";
    const onHighlightFn = jest.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onHighlight: onHighlightFn,
    });

    vm.stop();

    vm.step();

    expect(onHighlightFn).not.toBeCalled();
  });

  test("run executes all code", () => {
    const code = `
        highlightBlock("a");
        highlightBlock("b");
        highlightBlock("c");
    `;

    const onHighlightFn = jest.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onHighlight: onHighlightFn,
    });

    expect(onHighlightFn).not.toBeCalled();

    vm.run();

    // Each run executes a block and then schedules the next timer
    // so each `runOnlyPendingTimers` results in running code up until the
    // next highlightBlock call
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();

    expect(onHighlightFn).toBeCalledTimes(3);
    expect(onHighlightFn).toBeCalledWith("a");
    expect(onHighlightFn).toBeCalledWith("b");
    expect(onHighlightFn).toBeCalledWith("c");
  });

  test("run executes all code until a highlightBlock per timer", () => {
    const code = `
        highlightBlock("a");
        for(var i = 0; i < 10; i++);
        highlightBlock("b");
        for(var i = 0; i < 10; i++);
        highlightBlock("c");
    `;

    const onHighlightFn = jest.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onHighlight: onHighlightFn,
    });

    expect(onHighlightFn).not.toBeCalled();

    vm.run();

    // Each run executes a block and then schedules the next timer
    // so each `runOnlyPendingTimers` results in running code up until the
    // next highlightBlock call
    expect(onHighlightFn).toBeCalledTimes(0);
    jest.runOnlyPendingTimers();
    expect(onHighlightFn).toBeCalledTimes(1);
    expect(onHighlightFn).toBeCalledWith("a");
    jest.runOnlyPendingTimers();
    expect(onHighlightFn).toBeCalledTimes(2);
    expect(onHighlightFn).toBeCalledWith("b");
    jest.runOnlyPendingTimers();
    expect(onHighlightFn).toBeCalledTimes(3);
    expect(onHighlightFn).toBeCalledWith("c");
  });

  test("run does not execute any code when paused", () => {
    const code = `
        highlightBlock("a");
        for(var i = 0; i < 10; i++);
        highlightBlock("b");
        for(var i = 0; i < 10; i++);
        highlightBlock("c");
    `;

    const onHighlightFn = jest.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onHighlight: onHighlightFn,
    });

    expect(onHighlightFn).not.toBeCalled();

    vm.run();

    // Each run executes a block and then schedules the next timer
    // so each `runOnlyPendingTimers` results in running code up until the
    // next highlightBlock call
    expect(onHighlightFn).toBeCalledTimes(0);
    jest.runOnlyPendingTimers();
    expect(onHighlightFn).toBeCalledTimes(1);
    expect(onHighlightFn).toBeCalledWith("a");

    vm.pause();

    jest.runOnlyPendingTimers();
    expect(onHighlightFn).toBeCalledTimes(1);
    expect(onHighlightFn).not.toBeCalledWith("b");
  });

  test("the vm can be unpaused", () => {
    const code = `
        highlightBlock("a");
        for(var i = 0; i < 10; i++);
        highlightBlock("b");
        for(var i = 0; i < 10; i++);
        highlightBlock("c");
    `;

    const onHighlightFn = jest.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onHighlight: onHighlightFn,
    });

    expect(onHighlightFn).not.toBeCalled();

    vm.run();
    vm.pause();

    // Each run executes a block and then schedules the next timer
    // so each `runOnlyPendingTimers` results in running code up until the
    // next highlightBlock call
    jest.runOnlyPendingTimers();
    expect(onHighlightFn).toBeCalledTimes(0);

    vm.unpause();

    jest.runOnlyPendingTimers();
    expect(onHighlightFn).toBeCalledTimes(1);
    expect(onHighlightFn).toBeCalledWith("a");
  });

  test("stepping a running vm does not do anything", () => {
    const code = `
    highlightBlock("a");
    highlightBlock("b");
    highlightBlock("c");
`;

    const onHighlightFn = jest.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onHighlight: onHighlightFn,
    });

    expect(onHighlightFn).not.toBeCalled();

    vm.run();
    vm.step();

    // vm is already running - don't do anything
    expect(onHighlightFn).toBeCalledTimes(0);

    // run still works
    jest.runOnlyPendingTimers();
    expect(onHighlightFn).toBeCalledTimes(1);
  });

  test("the vm can be stopped in the middle of a run", () => {
    const code = `
    highlightBlock("a");
    highlightBlock("b");
    highlightBlock("c");
`;

    const onHighlightFn = jest.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onHighlight: onHighlightFn,
    });

    expect(onHighlightFn).not.toBeCalled();

    vm.run();

    jest.runOnlyPendingTimers();
    expect(onHighlightFn).toBeCalledTimes(1);

    vm.stop();

    jest.runOnlyPendingTimers();
    expect(onHighlightFn).toBeCalledTimes(1);
  });

  test("run calls the onFinished callback when finished", () => {
    const code = `for(var i = 0; i < 10; i++);`;
    const onFinishedFn = jest.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onFinish: onFinishedFn,
    });

    vm.run();
    jest.runOnlyPendingTimers();

    expect(onFinishedFn).toBeCalled();
  });

  test("the executionState is returned correct", () => {
    const code = `
      highlightBlock("a");
    `;
    const vm = new BlocklyInterpreter(code, speed, {});

    expect(vm.getExecutionState()).toBe(ExecutionState.PAUSED);

    // step to a
    vm.step();

    expect(vm.getExecutionState()).toBe(ExecutionState.PAUSED);

    vm.run();
    expect(vm.getExecutionState()).toBe(ExecutionState.RUNNING);

    vm.pause();
    expect(vm.getExecutionState()).toBe(ExecutionState.PAUSED);

    vm.pause();
    expect(vm.getExecutionState()).toBe(ExecutionState.PAUSED);

    vm.run();
    expect(vm.getExecutionState()).toBe(ExecutionState.RUNNING);

    vm.step();
    expect(vm.getExecutionState()).toBe(ExecutionState.RUNNING);

    // finish the program
    jest.runOnlyPendingTimers();
    expect(vm.getExecutionState()).toBe(ExecutionState.STOPPED);

    vm.pause();
    expect(vm.getExecutionState()).toBe(ExecutionState.STOPPED);

    vm.run();
    expect(vm.getExecutionState()).toBe(ExecutionState.STOPPED);

    vm.step();
    expect(vm.getExecutionState()).toBe(ExecutionState.STOPPED);

    vm.unpause();
    expect(vm.getExecutionState()).toBe(ExecutionState.STOPPED);
  });
});
