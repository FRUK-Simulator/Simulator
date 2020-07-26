import { FunctionComponent } from "react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { isExecuting, getExecutionState } from "./vmSlice";
import { getCode } from "./vmSlice";
import { CommandBar, ICommandBarItemProps } from "@fluentui/react";
import { useVM } from "./JavascriptVM";
import { ExecutionState } from "./vm";
import {
  getChallengeNames,
  getChallengesPerArena,
} from "../RobotSimulator/ChallengeConfigLoader";

/**
 * Renders a component that is responsible for controlling the VM according to the state
 * of the application. Provides controls to conditionally start, stop, step, and run the VM.
 */
export const VMControls: FunctionComponent = () => {
  const executing = useSelector(isExecuting);
  const executionStatus = useSelector(getExecutionState);
  const vm = useVM();
  const code = useSelector(getCode);
  const [challenge, setChallenge] = useState(getChallengeNames()[0]);

  function getChallengeSubMenuItems(challengeNames: string[]) {
    let items: Array<any> = [];
    challengeNames.forEach((challengeName: string) => {
      let item = {
        key: challengeName,
        name: challengeName,
        onClick: () => {
          vm.setChallenge(challengeName);
          setChallenge(challengeName);
        },
      };

      items.push(item);
    });

    return items;
  }

  function getChallengeMenuItems() {
    let items: Array<any> = [];
    let item;

    let challengesPerArena = getChallengesPerArena();
    challengesPerArena.forEach(
      (challengeNames: Array<string>, arena: string) => {
        if (challengeNames.length > 1) {
          item = {
            key: arena,
            name: arena,
            subMenuProps: {
              items: getChallengeSubMenuItems(challengeNames),
            },
          };
          items.push(item);
        } else if (challengeNames.length === 1) {
          item = {
            key: challengeNames[0],
            name: challengeNames[0],
            onClick: () => {
              vm.setChallenge(challengeNames[0]);
              setChallenge(challengeNames[0]);
            },
          };
          items.push(item);
        }
      }
    );

    return items;
  }

  const challengeSelection: ICommandBarItemProps = {
    key: challenge,
    text: challenge,
    subMenuProps: {
      // We list challenges by arena first
      items: getChallengeMenuItems(),
    },
  };
  const startButton: ICommandBarItemProps = {
    onClick() {
      vm.start();
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
      vm.step();
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
      vm.run();
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
      vm.pause();
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
      vm.stop();
    },
    key: "stop",
    text: "Stop",
    iconProps: {
      iconName: "Stop",
      className: "javascript-vm-controls--stop-button",
    },
  };
  const commandBarRunningItems: ICommandBarItemProps[] = [
    { ...challengeSelection, disabled: true },
    stopButton,
    executionStatus === ExecutionState.RUNNING
      ? { ...stepButton, disabled: true }
      : stepButton,
    executionStatus === ExecutionState.RUNNING ? pauseButton : runButton,
  ];
  const commandBarStoppedItems: ICommandBarItemProps[] = [
    { ...challengeSelection, disabled: false },
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
