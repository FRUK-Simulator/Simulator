import React, { FunctionComponent } from "react";
import "./ControlPanel.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getMotorPower,
  robotSimulatorSlice,
} from "../RobotSimulator/robotSimulatorSlice";

/**
 * Component that wraps the control panel.
 */
export const ControlPanel: FunctionComponent = () => {
  const dispatch = useDispatch();
  const leftMotor = useSelector(getMotorPower(0));
  const rightMotor = useSelector(getMotorPower(1));

  return (
    <div className="control-panel">
      <div>
        <button
          onClick={() =>
            dispatch(
              robotSimulatorSlice.actions.setPower({
                channel: 0,
                power: leftMotor + 0.2,
              })
            )
          }
        >
          +
        </button>
        <span style={{ width: 40, display: "inline-block" }}>
          {leftMotor.toFixed(2)}
        </span>
        <button
          onClick={() =>
            dispatch(
              robotSimulatorSlice.actions.setPower({
                channel: 0,
                power: leftMotor - 0.2,
              })
            )
          }
        >
          -
        </button>
      </div>
      <div>
        <button
          onClick={() =>
            dispatch(
              robotSimulatorSlice.actions.setPower({
                channel: 1,
                power: rightMotor + 0.2,
              })
            )
          }
        >
          +
        </button>
        <span style={{ width: 40, display: "inline-block" }}>
          {rightMotor.toFixed(2)}
        </span>
        <button
          onClick={() =>
            dispatch(
              robotSimulatorSlice.actions.setPower({
                channel: 1,
                power: rightMotor - 0.2,
              })
            )
          }
        >
          -
        </button>
      </div>
    </div>
  );
};
