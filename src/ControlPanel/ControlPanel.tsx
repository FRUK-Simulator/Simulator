import React, { FunctionComponent, useState } from "react";
import "./ControlPanel.css";
import { useSelector } from "react-redux";
import { getMotorPower } from "../RobotSimulator/robotSimulatorSlice";
import { Slider, IconButton } from "@fluentui/react";
import { GameController } from "./GameController/GameController";
import { SimulatorLog } from "./SimulatorLog/SimulatorLog";
import { ToggleButtonBar } from "../Components/ToggleButtonBar";
import { useVM } from "../JavascriptVM/JavascriptVM";

enum ControlPanelView {
  robot,
  controller,
  log,
}

const MotorControl: FunctionComponent<{
  channel: number;
  onChange: (power: number) => void;
}> = ({ channel, onChange }) => {
  const power = useSelector(getMotorPower(channel));

  return (
    <Slider
      label={`Motor Channel ${channel}`}
      min={-1}
      max={1}
      step={0.25}
      value={power}
      onChange={onChange}
      showValue
      originFromZero
    />
  );
};

const MotorGroup: FunctionComponent<{ channels: number[] }> = ({
  channels,
}) => {
  const [locked, setLocked] = useState(false);

  const vm = useVM();

  const onChangeHandler = (channel: number, power: number) => {
    if (locked) {
      channels.forEach((c) => vm.robot.setMotorPower(channel, power));
    } else {
      vm.robot.setMotorPower(channel, power);
    }
  };

  return (
    <div className="motor-group">
      <IconButton
        iconProps={{ iconName: locked ? "lock" : "unlock" }}
        title="Lock Motors Together"
        onClick={setLocked.bind(null, !locked)}
      />
      <div className="motor-group--sliders">
        {channels.map((channel) => (
          <MotorControl
            channel={channel}
            key={channel}
            onChange={onChangeHandler.bind(null, channel)}
          />
        ))}
      </div>
    </div>
  );
};

const RobotView = () => {
  return <MotorGroup channels={[0, 1]} />;
};

const ControllerView = () => {
  return <GameController />;
};

const LogView = () => {
  return <SimulatorLog />;
};

/**
 * Component that wraps the control panel.
 */
export const ControlPanel: FunctionComponent = () => {
  const [controlPanelView, setControlPanelView] = useState<ControlPanelView>(
    ControlPanelView.robot,
  );

  const changeView = (view: ControlPanelView) => () =>
    setControlPanelView(view);

  const CurrentView = {
    [ControlPanelView.robot]: RobotView,
    [ControlPanelView.controller]: ControllerView,
    [ControlPanelView.log]: LogView,
  }[controlPanelView];

  return (
    <div className="control-panel">
      <ToggleButtonBar
        activeButton={
          controlPanelView === ControlPanelView.robot
            ? 0
            : controlPanelView === ControlPanelView.controller
              ? 1
              : 2
        }
        buttons={[
          { label: "Robot", onClick: changeView(ControlPanelView.robot) },
          {
            label: "Controller",
            onClick: changeView(ControlPanelView.controller),
          },
          { label: "Log", onClick: changeView(ControlPanelView.log) },
        ]}
      />
      <CurrentView />
    </div>
  );
};
