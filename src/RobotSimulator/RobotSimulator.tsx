import React, { FunctionComponent, useRef, useEffect, useContext } from "react";
import "./RobotSimulator.css";
import { Sim3D } from "@fruk/simulator-core";
import { StdWorldBuilder } from "./StdWorldBuilder";
import { RobotHandle } from "@fruk/simulator-core/dist/engine/handles";
import { WorldConfig } from "@fruk/simulator-core/dist/engine/SimulatorConfig";
import {
  IBallSpec,
  IBoxSpec,
  IConeSpec,
} from "@fruk/simulator-core/dist/engine/specs/CoreSpecs";
import { useSelector } from "react-redux";
import { getMotorPower } from "./robotSimulatorSlice";
import { IVirtualMachine, VMContext } from "../JavascriptVM/JavascriptVM";

interface ArenaConfig {
  worldConfig: WorldConfig;
  ballSpecs?: IBallSpec[];
  boxSpecs?: IBoxSpec[];
  coneSpecs?: IConeSpec[];
}

// This component coordinates between react html and the canvas. It uses the 3DSim class to handle the 3D scene and
// proxies all required events from the browsers into the simulation. All react redux integration is done at this level.
export const RobotSimulator: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasParentRef = useRef<HTMLDivElement>(null);
  const sim = useRef<Sim3D | null>(null);
  const robotRef = useRef<RobotHandle | null>(null);
  const controls = useContext(VMContext) as IVirtualMachine;

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
    const robot = new StdWorldBuilder(sim.current).build();
    sim.current.beginRendering();
    robotRef.current = robot!;

    return () => {
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

  // effect to set the arena
  useEffect(() => {
    function setupArena(arenaConfig: ArenaConfig) {
      sim.current?.configureWorld(arenaConfig.worldConfig);
      const robot = new StdWorldBuilder(sim.current!).build();
      robotRef.current = robot!;
      arenaConfig.ballSpecs?.forEach(function (ballSpec, index) {
        sim.current?.addBall(ballSpec);
      });
      arenaConfig.boxSpecs?.forEach(function (boxSpec, index) {
        sim.current?.addBox(boxSpec);
      });
      arenaConfig.coneSpecs?.forEach(function (coneSpec, index) {
        sim.current?.addCone(coneSpec);
      });
    }

    function setupPlainArena() {
      const arenaConfig: ArenaConfig = {
        worldConfig: {
          zLength: 20,
          xLength: 20,
          walls: [],
          camera: {
            position: {
              x: 0,
              y: 8,
              z: 10,
            },
          },
        },
      };
      setupArena(arenaConfig);
    }

    function setupParkingLotArena() {
      const height: number = 1;
      const thickness: number = 0.3;
      const length: number = 4;
      const width: number = 3;
      const arenaConfig: ArenaConfig = {
        worldConfig: {
          zLength: 30,
          xLength: 20,
          walls: [],
          camera: {
            position: {
              x: 0,
              y: 8,
              z: 10,
            },
          },
        },
        boxSpecs: [
          {
            type: "box",
            dimensions: { x: thickness, y: height, z: length },
            initialPosition: { x: 9, y: -13 },
          },
          {
            type: "box",
            dimensions: { x: thickness, y: height, z: length },
            initialPosition: { x: 5, y: -13 },
          },
          {
            type: "box",
            dimensions: { x: width, y: height, z: thickness },
            initialPosition: { x: -8.5, y: -12 },
          },
          {
            type: "box",
            dimensions: { x: width, y: height, z: thickness },
            initialPosition: { x: -8.5, y: -8 },
          },
        ],
      };
      setupArena(arenaConfig);
    }

    function setupZigZagArena() {
      const arenaConfig: ArenaConfig = {
        worldConfig: {
          zLength: 40,
          xLength: 20,
          walls: [],
          camera: {
            position: {
              x: 0,
              y: 8,
              z: 10,
            },
          },
        },
        coneSpecs: [
          {
            type: "cone",
            baseColor: 0x980000,
            height: 5,
            radius: 0.5,
            initialPosition: { x: 0, y: -15 },
          },
          {
            type: "cone",
            baseColor: 0x980000,
            height: 5,
            radius: 0.5,
            initialPosition: { x: 2, y: -10 },
          },
          {
            type: "cone",
            baseColor: 0x980000,
            height: 5,
            radius: 0.5,
            initialPosition: { x: -2, y: -5 },
          },
          {
            type: "cone",
            baseColor: 0x980000,
            height: 5,
            radius: 0.5,
            initialPosition: { x: 2, y: 0 },
          },
          {
            type: "cone",
            baseColor: 0x980000,
            height: 5,
            radius: 0.5,
            initialPosition: { x: -2, y: 5 },
          },
          {
            type: "cone",
            baseColor: 0x980000,
            height: 5,
            radius: 0.5,
            initialPosition: { x: 2, y: 10 },
          },
          {
            type: "cone",
            baseColor: 0x980000,
            height: 5,
            radius: 0.5,
            initialPosition: { x: 0, y: 15 },
          },
        ],
      };
      setupArena(arenaConfig);
    }

    function setupBowlingArena() {
      const arenaConfig: ArenaConfig = {
        worldConfig: {
          zLength: 60,
          xLength: 20,
          walls: [],
          camera: {
            position: {
              x: 0,
              y: 10,
              z: 10,
            },
          },
        },
        ballSpecs: [
          { type: "ball", radius: 1, initialPosition: { x: 0, y: -5 } },
        ],
        coneSpecs: [
          {
            type: "cone",
            baseColor: 0x980000,
            height: 5,
            radius: 0.5,
            initialPosition: { x: 1.5, y: -25 },
          },
          {
            type: "cone",
            baseColor: 0x980000,
            height: 5,
            radius: 0.5,
            initialPosition: { x: -1.5, y: -25 },
          },
          {
            type: "cone",
            baseColor: 0x980000,
            height: 5,
            radius: 0.5,
            initialPosition: { x: 4.5, y: -25 },
          },
          {
            type: "cone",
            baseColor: 0x980000,
            height: 5,
            radius: 0.5,
            initialPosition: { x: -4.5, y: -25 },
          },
          {
            type: "cone",
            baseColor: 0x980000,
            height: 5,
            radius: 0.5,
            initialPosition: { x: 0, y: -22 },
          },
          {
            type: "cone",
            baseColor: 0x980000,
            height: 5,
            radius: 0.5,
            initialPosition: { x: 3, y: -22 },
          },
          {
            type: "cone",
            baseColor: 0x980000,
            height: 5,
            radius: 0.5,
            initialPosition: { x: -3, y: -22 },
          },
          {
            type: "cone",
            baseColor: 0x980000,
            height: 5,
            radius: 0.5,
            initialPosition: { x: 1.5, y: -19 },
          },
          {
            type: "cone",
            baseColor: 0x980000,
            height: 5,
            radius: 0.5,
            initialPosition: { x: -1.5, y: -19 },
          },
          {
            type: "cone",
            baseColor: 0x980000,
            height: 5,
            radius: 0.5,
            initialPosition: { x: 0, y: -16 },
          },
        ],
      };
      setupArena(arenaConfig);
    }

    setupPlainArena();
    const setArena = (id: number) => {
      console.log("setArena id ", id);
      switch (id) {
        case 1:
          setupParkingLotArena();
          break;
        case 2:
          setupZigZagArena();
          break;
        case 3:
          setupBowlingArena();
          break;
        default:
          setupPlainArena();
      }
    };

    controls.linkSetArena(setArena);

    return () => {
      // clean up
    };
  }, [controls]);

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
