import React from "react";
import { Toolbar } from "../components/Toolbar/Toolbar";
import { Container } from "../components/Common/Container";
import { RobotSimulator } from "../../RobotSimulator/RobotSimulator";
import "./SimulatorView.css";

export const LeftPanel = () => (
  <div className="simulator-view--panel">
    <Container className="simulator-view--panel__main">
      Left Panel (Main)
    </Container>
    <Container className="simulator-view--panel__utility">
      Left Panel (Utility)
    </Container>
  </div>
);
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
