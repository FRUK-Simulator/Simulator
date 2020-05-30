import React, { FunctionComponent } from "react";
import { Blockly } from "../BlocklyInterface/Blockly";
import { RobotSimulator } from "../RobotSimulator/RobotSimulator";
import { ControlPanel } from "../ControlPanel/ControlPanel";
import "./SimulatorView.css";

export const SimulatorView: FunctionComponent = () => {
  return (
    <div className="content">
      <Blockly />
      <RobotSimulator />
      <ControlPanel />
    </div>
  );
};
