import React, { FunctionComponent, useRef, useEffect } from "react";
import "./RobotSimulator.css";
import { Sim3D, RobotSpecs } from "@fruk/simulator-core";
import { RobotHandle } from "@fruk/simulator-core/dist/engine/handles";
import { useSelector } from "react-redux";
import { getMotorPower } from "./robotSimulatorSlice";

// This component coordinates between react html and the canvas. It uses the 3DSim class to handle the 3D scene and
// proxies all required events from the browsers into the simulation. All react redux integration is done at this level.
export const RobotSimulator: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasParentRef = useRef<HTMLDivElement>(null);
  const sim = useRef<Sim3D | null>(null);
  const robotRef = useRef<RobotHandle | null>(null);

  const leftMotorPower = useSelector(getMotorPower(0));
  const rightMotorPower = useSelector(getMotorPower(1));

  // Sets the canvas width and height properties to match the parent
  function updateCanvasSize() {
    if (!canvasRef.current || !canvasParentRef.current) {
      return;
    }

    canvasRef.current.width = canvasParentRef.current.clientWidth;
    canvasRef.current.height = canvasParentRef.current.clientHeight;
  }

  // effect to initialize the simulator on first mount
  useEffect(() => {
    updateCanvasSize();

    sim.current = new Sim3D(canvasRef.current!);
    sim.current.beginRendering();

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
    const robot = sim.current.addRobot(robotSpec);
    robotRef.current = robot!;

    return () => {
      console.log("removing");
      // remove the simulator
      sim.current?.stopRendering();
      sim.current = null;
    };
  }, []);

  // effect to resize on resize events
  useEffect(() => {
    const onResize = () => {
      updateCanvasSize();
      sim.current?.onresize();
    };

    window.addEventListener("resize", onResize);

    return () => {
      // clean up
      window.removeEventListener("resize", onResize);
    };
  });

  useEffect(() => {
    console.log("updating", leftMotorPower, rightMotorPower);
    robotRef.current?.setMotorPower(0, leftMotorPower);
    robotRef.current?.setMotorPower(1, rightMotorPower);
  }, [leftMotorPower, rightMotorPower]);

  return (
    <div className="robot-simulator" ref={canvasParentRef}>
      <canvas className="simulator" ref={canvasRef}>
        Canvas is not supported in your browser, try another
      </canvas>
    </div>
  );
};
