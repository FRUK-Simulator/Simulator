import { BlocklyInterpreter, ExecutionState, ExecutionSpeed } from "./vm";
import { vi, describe, it, beforeEach, test, expect } from "vitest";

vi.useFakeTimers();

describe("javascript vm", () => {
  let speed: ExecutionSpeed;

  beforeEach(() => {
    speed = ExecutionSpeed.SLOW;
  });

  it("calls the highlightBlock callback", () => {
    const code = "function start() {highlightBlock('abc');}";
    const onHighlightFn = vi.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onHighlight: onHighlightFn,
    });

    vm.step();

    expect(onHighlightFn).toBeCalledWith("abc");
  });

  test("step runs the code until it hits a highlightBlock statement", () => {
    const code = `
      function start() {
        var a = 1;
        var b = 2;
        highlightBlock(a + b);
        var c = 3;
        highlightBlock(a + b + c);
      }
    `;
    const onHighlightFn = vi.fn();
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
    function start() {
      for(var i = 0; i < 10; i++);
      highlightBlock("a");
      for(var i = 0; i < 10; i++);
    }
    `;
    const onFinishedFn = vi.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onFinish: onFinishedFn,
    });

    vm.step();

    expect(onFinishedFn).not.toBeCalled();

    vm.step();

    expect(onFinishedFn).toBeCalled();
  });

  test("step does not run code when the vm has been stopped", () => {
    const code = "function start() { highlightBlock('abc'); }";
    const onHighlightFn = vi.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onHighlight: onHighlightFn,
    });

    vm.stop();

    vm.step();

    expect(onHighlightFn).not.toBeCalled();
  });

  test("run executes all code", () => {
    const code = `
      function start() {
        highlightBlock("a");
        highlightBlock("b");
        highlightBlock("c");
      }
    `;

    const onHighlightFn = vi.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onHighlight: onHighlightFn,
    });

    expect(onHighlightFn).not.toBeCalled();

    vm.run();

    // Each run executes a block and then schedules the next timer
    // so each `runOnlyPendingTimers` results in running code up until the
    // next highlightBlock call
    vi.runOnlyPendingTimers();
    vi.runOnlyPendingTimers();
    vi.runOnlyPendingTimers();

    expect(onHighlightFn).toBeCalledTimes(3);
    expect(onHighlightFn).toBeCalledWith("a");
    expect(onHighlightFn).toBeCalledWith("b");
    expect(onHighlightFn).toBeCalledWith("c");
  });

  test("run executes all code until a highlightBlock per timer", () => {
    const code = `
      function start() {
        highlightBlock("a");
        for(var i = 0; i < 10; i++);
        highlightBlock("b");
        for(var i = 0; i < 10; i++);
        highlightBlock("c");
      }
    `;

    const onHighlightFn = vi.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onHighlight: onHighlightFn,
    });

    expect(onHighlightFn).not.toBeCalled();

    vm.run();

    // Each run executes a block and then schedules the next timer
    // so each `runOnlyPendingTimers` results in running code up until the
    // next highlightBlock call
    expect(onHighlightFn).toBeCalledTimes(0);
    vi.runOnlyPendingTimers();
    expect(onHighlightFn).toBeCalledTimes(1);
    expect(onHighlightFn).toBeCalledWith("a");
    vi.runOnlyPendingTimers();
    expect(onHighlightFn).toBeCalledTimes(2);
    expect(onHighlightFn).toBeCalledWith("b");
    vi.runOnlyPendingTimers();
    expect(onHighlightFn).toBeCalledTimes(3);
    expect(onHighlightFn).toBeCalledWith("c");
  });

  test("run does not execute any code when paused", () => {
    const code = `
      function start() {
        highlightBlock("a");
        for(var i = 0; i < 10; i++);
        highlightBlock("b");
        for(var i = 0; i < 10; i++);
        highlightBlock("c");
      }
    `;

    const onHighlightFn = vi.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onHighlight: onHighlightFn,
    });

    expect(onHighlightFn).not.toBeCalled();

    vm.run();

    // Each run executes a block and then schedules the next timer
    // so each `runOnlyPendingTimers` results in running code up until the
    // next highlightBlock call
    expect(onHighlightFn).toBeCalledTimes(0);
    vi.runOnlyPendingTimers();
    expect(onHighlightFn).toBeCalledTimes(1);
    expect(onHighlightFn).toBeCalledWith("a");

    vm.pause();

    vi.runOnlyPendingTimers();
    expect(onHighlightFn).toBeCalledTimes(1);
    expect(onHighlightFn).not.toBeCalledWith("b");
  });

  test("the vm can be unpaused", () => {
    const code = `
      function start() {
        highlightBlock("a");
        for(var i = 0; i < 10; i++);
        highlightBlock("b");
        for(var i = 0; i < 10; i++);
        highlightBlock("c");
      }
    `;

    const onHighlightFn = vi.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onHighlight: onHighlightFn,
    });

    expect(onHighlightFn).not.toBeCalled();

    vm.run();
    vm.pause();

    // Each run executes a block and then schedules the next timer
    // so each `runOnlyPendingTimers` results in running code up until the
    // next highlightBlock call
    vi.runOnlyPendingTimers();
    expect(onHighlightFn).toBeCalledTimes(0);

    vm.unpause();

    vi.runOnlyPendingTimers();
    expect(onHighlightFn).toBeCalledTimes(1);
    expect(onHighlightFn).toBeCalledWith("a");
  });

  test("stepping a running vm does not do anything", () => {
    const code = `
      function start() {
        highlightBlock("a");
        highlightBlock("b");
        highlightBlock("c");
      }
    `;

    const onHighlightFn = vi.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onHighlight: onHighlightFn,
    });

    expect(onHighlightFn).not.toBeCalled();

    vm.run();
    vm.step();

    // vm is already running - don't do anything
    expect(onHighlightFn).toBeCalledTimes(0);

    // run still works
    vi.runOnlyPendingTimers();
    expect(onHighlightFn).toBeCalledTimes(1);
  });

  test("the vm can be stopped in the middle of a run", () => {
    const code = `
      function start() {
        highlightBlock("a");
        highlightBlock("b");
        highlightBlock("c");
      }
    `;

    const onHighlightFn = vi.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onHighlight: onHighlightFn,
    });

    expect(onHighlightFn).not.toBeCalled();

    vm.run();

    vi.runOnlyPendingTimers();
    expect(onHighlightFn).toBeCalledTimes(1);

    vm.stop();

    vi.runOnlyPendingTimers();
    expect(onHighlightFn).toBeCalledTimes(1);
  });

  test("run calls the onFinished callback when finished", () => {
    const code = `function start() { for(var i = 0; i < 10; i++); }`;
    const onFinishedFn = vi.fn();
    const vm = new BlocklyInterpreter(code, speed, {
      onFinish: onFinishedFn,
    });

    vm.run();
    vi.runOnlyPendingTimers();

    expect(onFinishedFn).toBeCalled();
  });

  test("the executionState is returned correct", () => {
    const code = `
      function start() {
        highlightBlock("a");
      }
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
    vi.runOnlyPendingTimers();
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
