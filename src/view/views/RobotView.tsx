import {
  ColorSensorBuilder,
  ContactSensorBuilder,
  DistanceSensorBuilder,
} from "@fruk/simulator-core/dist/builder/RobotBuilder";
import { SensorMountingFace } from "@fruk/simulator-core/dist/engine/specs/RobotSpecs";
import React from "react";
import { useSelector } from "react-redux";
import { DISTANCE_SENSOR_RANGE } from "../../JavascriptVM/distanceSensorConstants";
import { useVM } from "../../JavascriptVM/JavascriptVM";
import {
  getMotorStats,
  getRoboSpec,
} from "../../RobotSimulator/robotSimulatorSlice";
import { Container } from "../components/Common/Container";
import { Divider } from "../components/Common/Divider";
import { StatusTile, StatusTileVariant } from "../components/Common/StatusTile";
import { Title } from "../components/Common/Title";
import { EditorControls, VMControls } from "./BlocklyView";
import "./RobotView.css";

export const RobotView = () => {
  const motorStats = useSelector(getMotorStats);
  const robotSpec = useSelector(getRoboSpec);

  let distSensors: Array<DistanceSensorBuilder> = [];
  let contactSensors: Array<ContactSensorBuilder> = [];
  let colorSensors: Array<ColorSensorBuilder> = [];

  robotSpec.basicSensors?.forEach((basicSensor) => {
    if (basicSensor.type === "distance-sensor") {
      distSensors.push(basicSensor as DistanceSensorBuilder);
    } else if (basicSensor.type === "contact-sensor") {
      contactSensors.push(basicSensor as ContactSensorBuilder);
    }
  });
  robotSpec.complexSensors?.forEach((complexSensor) => {
    if (complexSensor.type === "color-sensor") {
      colorSensors.push(complexSensor as ColorSensorBuilder);
    }
  });

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
          <StatusTile label="Distance Sensors" value={distSensors.length} />
          {distSensors.map((sensor) => (
            <StatusTile
              variant={StatusTileVariant.active}
              label={`${SensorMountingFace[sensor.mountFace]}`}
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
          <StatusTile label="Color Sensors" value={colorSensors.length} />
          {colorSensors.map((sensor) => (
            <StatusTile
              variant={StatusTileVariant.active}
              label={SensorMountingFace[sensor.mountFace]}
              sublabel={`Channel: ${sensor.channel}`}
              value={`n/a`}
            />
          ))}
        </div>

        <div className="robot-view--stats">
          <StatusTile label="Contact Sensors" value={contactSensors.length} />
          {contactSensors.map((sensor) => (
            <StatusTile
              variant={StatusTileVariant.active}
              label={SensorMountingFace[sensor.mountFace]}
              sublabel={`Channel: ${sensor.channel}`}
              value={robotHandle.getDigitalInput(sensor.channel) ? 1 : 0}
            />
          ))}
        </div>
        <div className="robot-view--stats">
          <StatusTile label="Gyroscope" value={1} />
          <StatusTile
            variant={StatusTileVariant.active}
            label={"Radians"}
            value={robotHandle ? robotHandle.getAngle().toFixed(2) : 0}
          />
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
