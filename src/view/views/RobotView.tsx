import React from "react";
import { useSelector } from "react-redux";
import { DISTANCE_SENSOR_RANGE } from "../../JavascriptVM/distanceSensorConstants";
import { useVM } from "../../JavascriptVM/JavascriptVM";
import {
  getMotorStats,
  getSensors,
} from "../../RobotSimulator/robotSimulatorSlice";
import { Container } from "../components/Common/Container";
import { Divider } from "../components/Common/Divider";
import { StatusTile, StatusTileVariant } from "../components/Common/StatusTile";
import { Title } from "../components/Common/Title";
import { EditorControls, VMControls } from "./BlocklyView";
import "./RobotView.css";

export const RobotView = () => {
  const motorStats = useSelector(getMotorStats);
  const sensors = useSelector(getSensors);

  const vm = useVM();
  let robotHandle = vm.robot;

  return (
    <>
      <Container className="simulator-view--panel__main robot-view">
        <Title as="h2" divider>
          Robot Status
        </Title>
        <Divider />
        <div className="robot-view--stats">
          <StatusTile label="Robot Motors" value={motorStats.length} />
          {motorStats.map(([label, value]) => (
            <StatusTile
              variant={StatusTileVariant.active}
              label={`Port ${label}`}
              value={value}
            />
          ))}
        </div>

        <div className="robot-view--stats">
          <StatusTile
            label="Distance Sensors"
            value={sensors.distanceSensors.length}
          />
          {sensors.distanceSensors.map((sensor) => (
            <StatusTile
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
          {sensors.colorSensors.map((sensor) => (
            <StatusTile
              variant={StatusTileVariant.active}
              label={sensor.mountFaceName}
              sublabel={`Channel: ${sensor.channel}`}
              value={`n/a`}
            />
          ))}
        </div>

        <div className="robot-view--stats">
          <StatusTile
            label="Contact Sensors"
            value={sensors.contactSensors.length}
          />
          {sensors.contactSensors.map((sensor) => (
            <StatusTile
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
          {sensors.gyroscopeSensors.map((sensor) => (
            <StatusTile
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
