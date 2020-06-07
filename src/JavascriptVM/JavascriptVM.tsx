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
    },
  };

  const commandBarRunningItems: ICommandBarItemProps[] = [
    runButton,
    stepButton,
    stopButton,
  ];
  const commandBarStoppedItems: ICommandBarItemProps[] = [
    startButton,
    { ...stepButton, disabled: true },
    { ...stopButton, disabled: true },
  ];

  return (
    <div className="javascript-vm-controls">
      <CommandBar
        items={executing ? commandBarRunningItems : commandBarStoppedItems}
      />
    </div>
  );
};
