import React, { FunctionComponent } from "react";
import { EditorView } from "../Editor/EditorView";
import { RobotSimulator } from "../RobotSimulator/RobotSimulator";
import { ControlPanel } from "../ControlPanel/ControlPanel";
import { GameController } from "../Views/GameController/GameController";
import "./SimulatorView.css";

export const SimulatorView: FunctionComponent = () => {
  return (
    <div className="content">
      <EditorView />
      <RobotSimulator />
      <ControlPanel />
      <GameController />
    </div>
  );
};
