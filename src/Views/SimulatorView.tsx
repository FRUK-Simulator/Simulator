import React, { FunctionComponent } from "react";
import { RobotSimulator } from "../RobotSimulator/RobotSimulator";
import { ControlPanel } from "../ControlPanel/ControlPanel";
import "./SimulatorView.css";
import { BlocklyEditor } from "../BlocklyInterface/BlocklyEditor";
import { ControlHubEmulatorComp } from "../ControlHubEmulator/ControlHubEmulator";

export const SimulatorView: FunctionComponent = () => {
  return (
    <div className="content">
      <BlocklyEditor />
      <RobotSimulator />
      <ControlPanel />
      <ControlHubEmulatorComp />
    </div>
  );
};
