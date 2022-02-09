import React, { FunctionComponent, useRef, useEffect } from "react";
import "./RobotSimulator.css";
import { useVM } from "../JavascriptVM/JavascriptVM";

// This component coordinates between react html and the canvas. It uses the 3DSim class to handle the 3D scene and
// proxies all required events from the browsers into the simulation. All react redux integration is done at this level.
export const RobotSimulator: FunctionComponent = () => {
  const canvasParentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vm = useVM();

  // effect to initialize the simulator on first mount
  useEffect(() => {
    let canvasEl = canvasRef.current!;
    vm.onCanvasCreated(canvasEl);
    return () => {
      vm.onCanvasDestroyed(canvasEl);
    };
  }, [canvasRef]);

  return (
    <div className="robot-simulator" ref={canvasParentRef}>
      <canvas className="simulator" ref={canvasRef}>
        Canvas is not supported in your browser, try another
      </canvas>
    </div>
  );
};
