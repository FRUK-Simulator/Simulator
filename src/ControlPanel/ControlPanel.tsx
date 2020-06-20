import React, { FunctionComponent, useState } from "react";
import "./ControlPanel.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getMotorPower,
  robotSimulatorSlice,
} from "../RobotSimulator/robotSimulatorSlice";
import { Slider, IconButton } from "@fluentui/react";

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
  const dispatch = useDispatch();
  const [locked, setLocked] = useState(false);
  const onChangeHandler = (channel: number, power: number) => {
    if (locked) {
      channels.forEach((c) => {
        dispatch(robotSimulatorSlice.actions.setPower({ channel: c, power }));
      });
    } else {
      dispatch(robotSimulatorSlice.actions.setPower({ channel, power }));
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

/**
 * Component that wraps the control panel.
 */
export const ControlPanel: FunctionComponent = () => {
  return (
    <div className="control-panel">
      <MotorGroup channels={[0, 1]} />
    </div>
  );
};
