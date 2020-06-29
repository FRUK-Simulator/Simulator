import React, { FunctionComponent, useRef, useEffect, useContext } from "react";
import "./RobotSimulator.css";
import { Sim3D } from "@fruk/simulator-core";
import { StdWorldBuilder } from "./StdWorldBuilder";
import { RobotHandle } from "@fruk/simulator-core/dist/engine/handles";
import { WorldConfig } from "@fruk/simulator-core/dist/engine/SimulatorConfig";
import {
  IBallSpec,
  IBoxSpec,
} from "@fruk/simulator-core/dist/engine/specs/CoreSpecs";
import { useSelector } from "react-redux";
import { getMotorPower } from "./robotSimulatorSlice";
import { IVirtualMachine, VMContext } from "../JavascriptVM/JavascriptVM";

interface ArenaConfig {
  worldConfig: WorldConfig;
  ballSpecs?: IBallSpec[];
  boxSpecs?: IBoxSpec[];
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
  }

  function setupArena1() {
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
      ballSpecs: [
        { type: "ball", radius: 0.5, initialPosition: { x: 4, y: 4 } },
        { type: "ball", radius: 0.3 },
      ],
      boxSpecs: [
        { type: "box", dimensions: { x: 1, y: 2, z: 3 } },
        { type: "box", dimensions: { x: 1, y: 2, z: 3 } },
      ],
    };
    setupArena(arenaConfig);
  }

  function setupArena2() {
    const arenaConfig: ArenaConfig = {
      worldConfig: {
        zLength: 10,
        xLength: 10,
        walls: [],
        camera: {
          position: {
            x: 0,
            y: 4,
            z: 5,
          },
        },
      },
      ballSpecs: [
        { type: "ball", radius: 0.5 },
        { type: "ball", radius: 0.3 },
      ],
    };
    setupArena(arenaConfig);
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
    const setArena = (id: number) => {
      console.log("setArena id ", id);
      switch (id) {
        case 1:
          setupArena1();
          break;
        case 2:
          setupArena2();
          break;
        default:
          sim.current?.resetSimulator();
          const robot = new StdWorldBuilder(sim.current!).build();
          robotRef.current = robot!;
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
