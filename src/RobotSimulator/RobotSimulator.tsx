import React, { FunctionComponent, useRef, useEffect } from "react";
import "./RobotSimulator.css";
import { Sim3D } from "@fruk/simulator-core";
import { StdWorldBuilder } from "./StdWorldBuilder";

// This component coordinates between react html and the canvas. It uses the 3DSim class to handle the 3D scene and
// proxies all required events from the browsers into the simulation. All react redux integration is done at this level.
export const RobotSimulator: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasParentRef = useRef<HTMLDivElement>(null);

  const sim = useRef<Sim3D | null>(null);

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
    sim.current?.beginRendering();
    /*const robot = */ new StdWorldBuilder(sim.current).build();

    return () => {
      // remove the simulator
      sim.current?.stopRendering();
      sim.current = null;
    };
  });

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

  return (
    <div className="robot-simulator" ref={canvasParentRef}>
      <canvas className="simulator" ref={canvasRef}>
        Canvas is not supported in your browser, try another
      </canvas>
    </div>
  );
};
