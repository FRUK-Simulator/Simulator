import { FunctionComponent, useState } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { isExecuting, vmSlice } from "./vmSlice";
import { getCode } from "./vmSlice";
import { AppDispatch } from "../store";
import { BlocklyInterpreter } from "./vm";
import { blocklySlice } from "../BlocklyInterface/blocklySlice";
import { CommandBar, ICommandBarItemProps } from "@fluentui/react";

import "./JavascriptVM.css";

/**
 * Renders a component that is responsible for controlling the VM according to the state
 * of the application. Provides controls to conditionally start, stop, step, and run the VM.
 */
export const JavascriptVM: FunctionComponent = () => {
  const [interpreter, setInterpreter] = useState<BlocklyInterpreter | null>(
    null
  );
  const executing = useSelector(isExecuting);
  const dispatch = useDispatch<AppDispatch>();
  const code = useSelector(getCode);

  const startButton: ICommandBarItemProps = {
    onClick() {
      if (!code) {
        return;
      }
      dispatch(vmSlice.actions.startExecution());
      setInterpreter(
        new BlocklyInterpreter(code, {
          onHighlight: (id) =>
            dispatch(blocklySlice.actions.highlightBlock({ blockId: id })),
        })
      );
    },
    key: "start",
    text: "Start",
    iconProps: {
      iconName: "Play",
      className: "javascript-vm-controls--start-button",
    },
  };

  const stepButton: ICommandBarItemProps = {
    onClick() {
      const finished = interpreter?.step();

      if (finished) {
        dispatch(vmSlice.actions.stopExecution());
        setInterpreter(null);
      }
    },
    key: "next",
    text: "Next",
    iconProps: {
      iconName: "Next",
      className: "javascript-vm-controls--step-button",
    },
  };

  const runButton: ICommandBarItemProps = {
    onClick() {
      interpreter?.run();
      dispatch(vmSlice.actions.stopExecution());
      setInterpreter(null);
    },
    key: "run",
    text: "Run",
    iconProps: {
      iconName: "FastForward",
      className: "javascript-vm-controls--run-button",
    },
  };

  const stopButton: ICommandBarItemProps = {
    onClick() {
      dispatch(vmSlice.actions.stopExecution());
      setInterpreter(null);
    },
    key: "stop",
    text: "Stop",
    iconProps: {
      iconName: "Stop",
      className: "javascript-vm-controls--stop-button",
    },
  };

  const commandBarRunningItems: ICommandBarItemProps[] = [
    stopButton,
    stepButton,
    runButton,
  ];
  const commandBarStoppedItems: ICommandBarItemProps[] = [
    startButton,
    { ...stepButton, disabled: true },
    { ...runButton, disabled: true },
  ];

  return (
    <div className="javascript-vm-controls">
      <CommandBar
        items={executing ? commandBarRunningItems : commandBarStoppedItems}
      />
    </div>
  );
};
