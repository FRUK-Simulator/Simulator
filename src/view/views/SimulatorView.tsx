import React, { FunctionComponent, useEffect } from "react";
import { Toolbar } from "../components/Toolbar/Toolbar";
import { Container } from "../components/Common/Container";
import { RobotSimulator } from "../../RobotSimulator/RobotSimulator";
import "./SimulatorView.css";
import { useLocation, useParams } from "react-router-dom";
import { BlocklyView } from "./BlocklyView";
import { useVM } from "../../JavascriptVM/JavascriptVM";
import {
  getChallengesPerArena,
  getDefaultChallenge,
} from "../../RobotSimulator/ChallengeConfigLoader";
import { MyProgramsView } from "./MyProgramsView";
import { RobotView } from "./RobotView";
import { SettingsView } from "./SettingsView";

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
  <div className="simulator-view--panel">
    <Container>
      <RobotSimulator />
    </Container>
  </div>
);

export const SimulatorView = () => {
  const vm = useVM();
  const { lesson = "", challenge = "" } = useParams<{
    lesson: string;
    challenge: string;
  }>();

  useEffect(function loadChallengeFromURL() {
    vm.setChallenge(
      getChallengesPerArena()
        .get(lesson)
        ?.find((c) => c.name === challenge) ?? getDefaultChallenge()
    );
  });

  return (
    <div className="simulator-view">
      <LeftPanel />
      <RightPanel />
      <Toolbar />
    </div>
  );
};
