import React, { FunctionComponent, useEffect } from "react";
import { Toolbar } from "../components/Toolbar/Toolbar";
import { Container } from "../components/Common/Container";
import { RobotSimulator } from "../../RobotSimulator/RobotSimulator";
import "./SimulatorView.css";
import { Prompt, useLocation, useParams } from "react-router-dom";
import { BlocklyView } from "./BlocklyView";
import { useVM } from "../../JavascriptVM/JavascriptVM";
import {
  getChallengesPerArena,
  getDefaultChallenge,
} from "../../RobotSimulator/ChallengeConfigLoader";
import { MyProgramsView } from "./MyProgramsView";
import { RobotView } from "./RobotView";
import { SettingsView } from "./SettingsView";
import { Gamepad } from "../components/Gamepad/Gamepad";

export enum SimulatorViews {
  code = "code",
  robot = "robot",
  programs = "programs",
  settings = "settings",
}

const simulatorViews: Record<SimulatorViews, FunctionComponent> = {
  code: BlocklyView,
  robot: RobotView,
  programs: MyProgramsView,
  settings: SettingsView,
};

const WarningPrompt = () => {
  const currentLocation = useLocation();

  return (
    <Prompt
      message={(nextLocation) => {
        if (nextLocation.pathname !== currentLocation.pathname) {
          return "Are you sure you want to leave? All unsaved work will be lost.";
        }

        return true;
      }}
    />
  );
};

export const LeftPanel = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedView = queryParams.get("view") as SimulatorViews;

  const View = simulatorViews[selectedView] ?? simulatorViews.code;

  return (
    <div className="simulator-view--panel">
      <View />
    </div>
  );
};

export const RightPanel = () => (
  <Container className="simulator-view--panel">
    <RobotSimulator />
  </Container>
);

export const SimulatorView = () => {
  const vm = useVM();

  const { lesson = "", challenge = "" } = useParams<{
    lesson: string;
    challenge: string;
  }>();

  useEffect(
    function loadChallengeFromURL() {
      vm.setChallenge(
        getChallengesPerArena()
          .get(lesson)
          ?.find((c) => c.name === challenge) ?? getDefaultChallenge()
      );
    },
    [lesson, challenge, vm]
  );

  return (
    <div className="simulator-view">
      <WarningPrompt />
      <LeftPanel />
      <RightPanel />
      <Toolbar />
      <Gamepad />
    </div>
  );
};
