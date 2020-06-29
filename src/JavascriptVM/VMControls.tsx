import { FunctionComponent, useContext } from "react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { isExecuting, getExecutionState } from "./vmSlice";
import { getCode } from "./vmSlice";
import { CommandBar, ICommandBarItemProps } from "@fluentui/react";
import { VMContext, IVirtualMachine } from "./JavascriptVM";
import { ExecutionState } from "./vm";
/**
 * Renders a component that is responsible for controlling the VM according to the state
 * of the application. Provides controls to conditionally start, stop, step, and run the VM.
 */
export const VMControls: FunctionComponent = () => {
  const executing = useSelector(isExecuting);
  const executionStatus = useSelector(getExecutionState);
  const controls = useContext(VMContext) as IVirtualMachine;
  const code = useSelector(getCode);
  const [arena, setArena] = useState("Plain Arena");

  const arenaSelection: ICommandBarItemProps = {
    key: "arena0",
    text: arena,
    subMenuProps: {
      items: [
        {
          key: "arena0",
          name: "Plain Arena",
          onClick: () => {
            controls.setArena(0);
            setArena("Plain Arena");
          },
        },
        {
          key: "arena1",
          name: "Super Arena",
          onClick: () => {
            controls.setArena(1);
            setArena("Super Arena");
          },
        },
        {
          key: "arena2",
          name: "Awesome Arena",
          onClick: () => {
            controls.setArena(2);
            setArena("Awesome Arena");
          },
        },
      ],
    },
  };
  const startButton: ICommandBarItemProps = {
    onClick() {
      controls.start();
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
      controls.step();
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
      controls.run();
    },
    key: "run",
    text: "Run",
    iconProps: {
      iconName: "FastForward",
      className: "javascript-vm-controls--run-button",
    },
  };
  const pauseButton: ICommandBarItemProps = {
    onClick() {
      controls.pause();
    },
    key: "pause",
    text: "Pause",
    iconProps: {
      iconName: "Pause",
      className: "javascript-vm-controls--pause-button",
    },
  };
  const stopButton: ICommandBarItemProps = {
    onClick() {
      controls.stop();
    },
    key: "stop",
    text: "Stop",
    iconProps: {
      iconName: "Stop",
      className: "javascript-vm-controls--stop-button",
    },
  };
  const commandBarRunningItems: ICommandBarItemProps[] = [
    { ...arenaSelection, disabled: true },
    stopButton,
    executionStatus === ExecutionState.RUNNING
      ? { ...stepButton, disabled: true }
      : stepButton,
    executionStatus === ExecutionState.RUNNING ? pauseButton : runButton,
  ];
  const commandBarStoppedItems: ICommandBarItemProps[] = [
    { ...arenaSelection, disabled: false },
    { ...startButton, disabled: !code },
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
