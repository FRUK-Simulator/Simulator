import React, { ReactElement } from "react";
import { Toolbar } from "../components/Toolbar/Toolbar";
import { Container } from "../components/Common/Container";
import { RobotSimulator } from "../../RobotSimulator/RobotSimulator";
import "./SimulatorView.css";
import { Button } from "../components/Common/Button";
import { Switch, Route, useLocation } from "react-router-dom";
import { BlocklyEditor } from "../../BlocklyInterface/BlocklyEditor";

export enum SimulatorViews {
  code = "code",
  robot = "robot",
  programs = "programs",
  settings = "settings",
}

const BlocklyView = () => {
  return (
    <>
      <Container className="simulator-view--panel__main">
        <BlocklyEditor />
      </Container>
      <Container className="simulator-view--panel__utility">
        <Button>Test Button 1</Button>
        <Button>Test Button 2</Button>
      </Container>
    </>
  );
};

const simulatorViews: Record<SimulatorViews, () => React.ReactNode> = {
  code: BlocklyView,
  robot: () => null,
  programs: () => null,
  settings: () => null,
};

export const LeftPanel = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedView = queryParams.get("view") as SimulatorViews;

  if (simulatorViews[selectedView]) {
    return (
      <div className="simulator-view--panel">
        {simulatorViews[selectedView]()}
      </div>
    );
  }

  return <div className="simulator-view--panel">{simulatorViews.code()}</div>;
};
export const RightPanel = () => (
  <div className="simulator-view--panel">
    <Container>
      <RobotSimulator />
    </Container>
  </div>
);

export const SimulatorView = () => (
  <div className="simulator-view">
    <LeftPanel />
    <RightPanel />
    <Toolbar />
  </div>
);
