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

      const colorSensor = new RobotBuilder.ColorSensorBuilder(1);
      colorSensor.setMountFace(RobotSpecs.SensorMountingFace.BOTTOM);

      robotBuilder.addComplexSensor(colorSensor);
    }

    {
      // Wheels
      const wheelTemplate = new RobotBuilder.WheelBuilder(0.1, 0.03);
      const leftFront = wheelTemplate.copy();
      leftFront.setMountPoint(RobotSpecs.WheelMountingPoint.LEFT_FRONT);
      leftFront.setMountOffset({ x: 0, y: -0.05, z: 0.033 });

      const leftRear = wheelTemplate.copy();
      leftRear.setMountPoint(RobotSpecs.WheelMountingPoint.LEFT_REAR);
      leftRear.setMountOffset({ x: 0, y: -0.05, z: -0.033 });

      robotBuilder.addWheel("left-drive", leftFront);
      robotBuilder.addWheel("left-drive", leftRear);

      const rightFront = wheelTemplate.copy();
      rightFront.setMountPoint(RobotSpecs.WheelMountingPoint.RIGHT_FRONT);
      rightFront.setMountOffset({ x: 0, y: -0.05, z: 0.033 });

      const rightRear = wheelTemplate.copy();
      rightRear.setMountPoint(RobotSpecs.WheelMountingPoint.RIGHT_REAR);
      rightRear.setMountOffset({ x: 0, y: -0.05, z: -0.033 });

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
    robotSpec.mechanisms = [
      {
        type: "gripper-mechanism",
        ioMap: [
          {
            id: "grab",
            channel: 0,
            ioType: "DIGITAL_IN",
          },
          {
            id: "held",
            channel: 1,
            ioType: "DIGITAL_OUT",
          },
        ],
        depth: 1,
        maxWidth: 2,
        minWidth: 0.9,
        mountOffset: { x: 0, y: 0, z: -0.01 },
        mountFace: RobotSpecs.SensorMountingFace.FRONT,
      },
    ];

    robotSpec.initialPosition = this.startPosition;
    robotSpec.customMesh = {
      filePath: `${process.env.PUBLIC_URL}/assets/models/robot_full_compressed.glb`,
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
      scale: {
        x: 0.2,
        z: 0.2,
        y: 0.2,
      },
    };

    return this.sim3D.addRobot(robotSpec);
  }
}
