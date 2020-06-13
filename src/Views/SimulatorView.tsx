import React, { FunctionComponent } from "react";
import { RobotSimulator } from "../RobotSimulator/RobotSimulator";
import { ControlPanel } from "../ControlPanel/ControlPanel";
import "./SimulatorView.css";
import { BlocklyEditor } from "../BlocklyInterface/BlocklyEditor";
import { ControlHubEmulatorComp } from "../ControlHubEmulator/ControlHubEmulator";
import { ControlHubLogComp } from "../ControlHubLog/ControlHubLog";
import { ControlHubEmulator } from "@fruk/control-hub-emulator-core/dist/engine/ControlHubEmulator";
import { ControlHubEmulatorConfig } from "@fruk/control-hub-emulator-core/dist/engine/ControlHubEmulatorConfig";

export const SimulatorView: FunctionComponent = () => {
  let controlHubEmulatorConfig: ControlHubEmulatorConfig = {
    ports: {
      numberOfDcMotors: 4,
      numberOfServos: 6,
    },
  };
  let controlHubEmulator = new ControlHubEmulator(controlHubEmulatorConfig);

  return (
    <div className="content">
      <BlocklyEditor />
      <RobotSimulator />
      <ControlPanel />
      <ControlHubEmulatorComp controlHubEmulator={controlHubEmulator} />
      <ControlHubLogComp controlHubEmulator={controlHubEmulator} />
    </div>
  );
};
