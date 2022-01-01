import React, { FunctionComponent, useEffect, useLayoutEffect } from "react";
import { Toolbar } from "../components/Toolbar/Toolbar";
import { Container } from "../components/Common/Container";
import { RobotSimulator } from "../../RobotSimulator/RobotSimulator";
import "./SimulatorView.css";
import { useLocation, useParams } from "react-router-dom";
import { BlocklyView } from "./BlocklyView";
import { useVM } from "../../JavascriptVM/JavascriptVM";
import { getChallengeFromURL } from "../../RobotSimulator/ChallengeConfigLoader";
import { MyProgramsView } from "./MyProgramsView";
import { RobotView } from "./RobotView";
import { SettingsView } from "./SettingsView";
import { ChallengeView } from "./ChallengeView";
import { Gamepad } from "../components/Gamepad/Gamepad";

export enum SimulatorViews {
  code = "code",
  robot = "robot",
  programs = "programs",
  settings = "settings",
  challenge = "challenge",
}

const simulatorViews: Record<SimulatorViews, FunctionComponent> = {
  code: BlocklyView,
  robot: RobotView,
  programs: MyProgramsView,
  settings: SettingsView,
  challenge: ChallengeView,
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
      const challangeConfig = getChallengeFromURL(lesson, challenge);
      vm.setChallenge(challangeConfig);
    },
    [lesson, challenge, vm]
  );

  // Use layout effect ensures the vm is stopped before leaving
  useLayoutEffect(() => {
    return () => vm.stop();
  }, [vm]);

  return (
    <div className="simulator-view">
      <LeftPanel />
      <RightPanel />
      <Toolbar />
      <Gamepad />
    </div>
  );
};
