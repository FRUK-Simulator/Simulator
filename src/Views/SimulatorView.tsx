import React, { FunctionComponent } from "react";
import { RobotSimulator } from "../RobotSimulator/RobotSimulator";
import { ControlPanel } from "../ControlPanel/ControlPanel";
import "./SimulatorView.css";
import { BlocklyEditor } from "../BlocklyInterface/BlocklyEditor";

export const SimulatorView: FunctionComponent = () => {
  return (
    <div className="content">
      <BlocklyEditor />
      <RobotSimulator />
      <ControlPanel />
    </div>
  );
};
