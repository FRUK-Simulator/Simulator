import { Sim3D } from "@fruk/simulator-core";
import { RobotSpecs } from "@fruk/simulator-core";
import { Handles } from "@fruk/simulator-core";
import { CoreSimTypes } from "@fruk/simulator-core";
import { RobotBuilder } from "@fruk/simulator-core";
import { DISTANCE_SENSOR_RANGE } from "../JavascriptVM/distanceSensorConstants";

export class StdWorldBuilder {
  private sim3D: Sim3D;
  private startPosition: CoreSimTypes.Vector2d;

  constructor(sim3D: Sim3D, startPosition: CoreSimTypes.Vector2d) {
    this.sim3D = sim3D;
    this.startPosition = startPosition;
  }

  build(): Handles.RobotHandle | undefined {
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

    const robotSpec = robotBuilder.generateSpec();
    robotSpec.initialPosition = this.startPosition;
    return this.sim3D.addRobot(robotSpec);
  }
}
