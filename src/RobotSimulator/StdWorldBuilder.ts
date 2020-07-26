import { Sim3D } from "@fruk/simulator-core";
import { RobotSpecs } from "@fruk/simulator-core";
import { Handles } from "@fruk/simulator-core";

export class StdWorldBuilder {
  private sim3D: Sim3D;

  constructor(sim3D: Sim3D) {
    this.sim3D = sim3D;
  }

  build(): Handles.RobotHandle | undefined {
    const robotSpec: RobotSpecs.IRobotSpec = {
      type: "robot",
      dimensions: { x: 2, y: 1, z: 3 },
      drivetrain: {
        motorGroups: [
          {
            wheelGroup: "left-drive",
            motors: [{ channel: 0, maxForce: 5 }],
          },
          {
            wheelGroup: "right-drive",
            motors: [{ channel: 1, maxForce: 5 }],
          },
        ],
        wheelGroups: [
          {
            id: "left-drive",
            wheels: [
              {
                wheel: {
                  type: "robot-wheel",
                  radius: 0.5,
                  thickness: 0.15,
                },
                mountPoint: RobotSpecs.WheelMountingPoint.LEFT_FRONT,
                offset: { x: -0.075, y: -0.25, z: 0.5 },
              },
              {
                wheel: {
                  type: "robot-wheel",
                  radius: 0.5,
                  thickness: 0.15,
                },
                mountPoint: RobotSpecs.WheelMountingPoint.LEFT_REAR,
                offset: { x: -0.075, y: -0.25, z: -0.5 },
              },
            ],
          },
          {
            id: "right-drive",
            wheels: [
              {
                wheel: {
                  type: "robot-wheel",
                  radius: 0.5,
                  thickness: 0.15,
                },
                mountPoint: RobotSpecs.WheelMountingPoint.RIGHT_FRONT,
                offset: { x: 0.075, y: -0.25, z: 0.5 },
              },
              {
                wheel: {
                  type: "robot-wheel",
                  radius: 0.5,
                  thickness: 0.15,
                },
                mountPoint: RobotSpecs.WheelMountingPoint.RIGHT_REAR,
                offset: { x: 0.075, y: -0.25, z: -0.5 },
              },
            ],
          },
        ],
      },
    };
    return this.sim3D.addRobot(robotSpec);
  }
}
