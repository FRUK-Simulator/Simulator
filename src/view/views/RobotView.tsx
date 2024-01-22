import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getExecutionState } from "../../JavascriptVM/vmSlice";
import { ExecutionState } from "../../JavascriptVM/vm";
import { DISTANCE_SENSOR_RANGE } from "../../JavascriptVM/distanceSensorConstants";
import { useVM } from "../../JavascriptVM/JavascriptVM";
import { getSensors } from "../../RobotSimulator/robotSimulatorSlice";
import { Container } from "../components/Common/Container";
import { StatusTile, StatusTileVariant } from "../components/Common/StatusTile";
import { EditorControls, VMControls } from "./BlocklyView";
import "./RobotView.css";

function calculateCurrentTime() {
  return +new Date(); // convert time to unix timestamp milliseconds
}

export const RobotView = () => {
  enum TimerState {
    RUNNING = "running",
    STOPPED = "stopped",
    PAUSED = "paused",
    NON_STARTED = "Not Started",
  }

  const executionState = useSelector(getExecutionState);
  const sensors = useSelector(getSensors);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_currentTime, setCurrentTime] = useState(calculateCurrentTime());
  const [currentState, setCurrentState] = useState(TimerState.NON_STARTED);

  const vm = useVM();
  const robotHandle = vm.robot;

  const getColorHex = () => {
    const colorSensorValue = robotHandle.getComplexSensorValue(
      1,
      "ColorSensor",
    );
    return "color" in colorSensorValue
      ? `#${colorSensorValue.color.toString(16).padStart(6, "0")}`
      : "#ffffff";
  };

  const updateCurrentTime = () => {
    setCurrentTime(+new Date());
  };

  const startStopwatch = () => {
    if (currentState === TimerState.RUNNING) {
      // Timer already running
      return;
    }

    setCurrentState(TimerState.RUNNING);
    // start the timer again
    const handle = window.setInterval(updateCurrentTime, 23);
    return handle;
  };

  const stopStopwatch = () => {
    if (currentState === TimerState.RUNNING) {
      setCurrentState(TimerState.STOPPED);
    }
  };

  const pauseStopwatch = () => {
    if (currentState === TimerState.RUNNING) {
      setCurrentState(TimerState.PAUSED);
    }
  };

  // Using effect to update "currentState" to force RobotView to refresh
  // similar to timer.tsx component because we are reading the sensor values
  // but not store them in redux nor this component state.
  // The plan forward is to either store the sensor values in redux to make them
  // avilable to any view and also refresh any component that uses them or
  // store the values in this component state.
  useEffect(() => {
    let handleToStop: number | undefined;
    if (executionState === ExecutionState.RUNNING) {
      handleToStop = startStopwatch();
    } else if (
      executionState === ExecutionState.STOPPED ||
      executionState === ExecutionState.NONE
    ) {
      stopStopwatch();
    } else if (executionState === ExecutionState.PAUSED) {
      pauseStopwatch();
    }
    return () => {
      if (handleToStop) {
        clearInterval(handleToStop);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [executionState]);

  if (sensors.motors.length > 0) {
    const x = robotHandle.getMotorInputSignal(0);
    console.log("motor power " + x);
  }

  return (
    <>
      <Container className="simulator-view--panel__main robot-view">
        <div className="robot-view--stats">
          <StatusTile label="Robot Motors" value={sensors.motors.length} />
          {sensors.motors.map((motor, index) => (
            <StatusTile
              key={`motor-${index}`}
              variant={StatusTileVariant.active}
              label={motor.mountFaceName}
              sublabel={`Channel: ${motor.channel}`}
              value={robotHandle.getMotorInputSignal(motor.channel).toFixed(2)}
              // value={(
              //   robotHandle.getAnalogInput(sensor.channel) *
              //   DISTANCE_SENSOR_RANGE *
              //   100
              // ).toFixed(1)}
            />
          ))}
        </div>

        <div className="robot-view--stats">
          <StatusTile
            label="Distance Sensors"
            value={sensors.distanceSensors.length}
          />
          {sensors.distanceSensors.map((sensor, index) => (
            <StatusTile
              key={index}
              variant={StatusTileVariant.active}
              label={sensor.mountFaceName}
              sublabel={`Channel: ${sensor.channel}`}
              // Show it in centimeters: this is inspired by vm.ts: 'sensorConversionFactor'
              value={(
                robotHandle.getAnalogInput(sensor.channel) *
                DISTANCE_SENSOR_RANGE *
                100
              ).toFixed(1)}
            />
          ))}
        </div>

        <div className="robot-view--stats">
          <StatusTile
            label="Color Sensors"
            value={sensors.colorSensors.length}
          />
          {sensors.colorSensors.map((sensor, index) => (
            <StatusTile
              key={index}
              variant={StatusTileVariant.active}
              label={sensor.mountFaceName}
              sublabel={`Channel: ${sensor.channel}`}
              isColor={true}
              value={getColorHex()}
            />
          ))}
        </div>

        <div className="robot-view--stats">
          <StatusTile
            label="Contact Sensors"
            value={sensors.contactSensors.length}
          />
          {sensors.contactSensors.map((sensor, index) => (
            <StatusTile
              key={index}
              variant={StatusTileVariant.active}
              label={sensor.mountFaceName}
              sublabel={`Channel: ${sensor.channel}`}
              value={robotHandle.getDigitalInput(sensor.channel) ? 1 : 0}
            />
          ))}
        </div>
        <div className="robot-view--stats">
          <StatusTile
            label="Gyroscope"
            value={sensors.gyroscopeSensors.length}
          />
          {sensors.gyroscopeSensors.map((sensor, index) => (
            <StatusTile
              key={index}
              variant={StatusTileVariant.active}
              label={sensor.mountFaceName}
              sublabel={`Channel: ${sensor.channel}`}
              value={robotHandle.getAnalogInput(sensor.channel).toFixed(1)}
            />
          ))}
        </div>
      </Container>

      <div className="simulator-view">
        <div className="simulator-view--panel">
          <Container className="simulator-view--panel__utility">
            <VMControls />
            <EditorControls />
          </Container>
        </div>
      </div>
    </>
  );
};
