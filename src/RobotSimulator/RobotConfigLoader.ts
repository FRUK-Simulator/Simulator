import { RobotSpecs } from "@fruk/simulator-core";
import { RobotBuilder } from "@fruk/simulator-core";
import { DISTANCE_SENSOR_RANGE } from "../JavascriptVM/distanceSensorConstants";

export function createDefaultRobotSpec(): RobotSpecs.IRobotSpec {
  const robotBuilder = new RobotBuilder.Builder();
  robotBuilder.setDimensions({ x: 0.225, y: 0.125, z: 0.255 });

  {
    // Sensors
    const distanceSensor = new RobotBuilder.DistanceSensorBuilder(0);
    distanceSensor.setMountFace(RobotSpecs.SensorMountingFace.FRONT);
    distanceSensor.setMaxRange(DISTANCE_SENSOR_RANGE);

    robotBuilder.addBasicSensor(distanceSensor);
  }

  {
    // Wheels
    const wheelTemplate = new RobotBuilder.WheelBuilder(0.1);
    const leftFront = wheelTemplate.copy();
    leftFront.setMountPoint(RobotSpecs.WheelMountingPoint.LEFT_FRONT);
    leftFront.setMountOffset({ x: +0.05, y: -0.05, z: 0.033 });

    const leftRear = wheelTemplate.copy();
    leftRear.setMountPoint(RobotSpecs.WheelMountingPoint.LEFT_REAR);
    leftRear.setMountOffset({ x: +0.05, y: -0.05, z: -0.033 });

    robotBuilder.addWheel("left-drive", leftFront);
    robotBuilder.addWheel("left-drive", leftRear);

    const rightFront = wheelTemplate.copy();
    rightFront.setMountPoint(RobotSpecs.WheelMountingPoint.RIGHT_FRONT);
    rightFront.setMountOffset({ x: -0.05, y: -0.05, z: 0.033 });

    const rightRear = wheelTemplate.copy();
    rightRear.setMountPoint(RobotSpecs.WheelMountingPoint.RIGHT_REAR);
    rightRear.setMountOffset({ x: -0.05, y: -0.05, z: -0.033 });

    robotBuilder.addWheel("right-drive", rightFront);
    robotBuilder.addWheel("right-drive", rightRear);
  }

  {
    // Motors
    const motor = new RobotBuilder.MotorBuilder();
    motor.setMaxForce(0.25);

    const leftMotors = motor.copy();
    leftMotors.setChannel(0);

    const rightMotors = motor.copy();
    rightMotors.setChannel(1);

    robotBuilder.addMotor("left-drive", leftMotors);
    robotBuilder.addMotor("right-drive", rightMotors);
  }

  return robotBuilder.generateSpec();
}
