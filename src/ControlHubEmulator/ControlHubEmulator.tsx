import React, { FunctionComponent, useRef, useEffect } from "react";
import "./ControlHubEmulator.css";
import { controlHubEmulator } from "../store";
import { ControlHubEmulatorView } from "@fruk/control-hub-emulator-core";

// This component coordinates between react html and the canvas. It uses the ControlHubEmulatorView class to handle the UI and
// proxies all required events from the browsers into the ControlHubEmulatorView. All react redux integration is done at this level.
export const ControlHubEmulatorComp: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasParentRef = useRef<HTMLDivElement>(null);

  const controlHubEmulatorView = useRef<ControlHubEmulatorView | null>(null);

  // Sets the canvas width and height properties to match the parent
  function updateCanvasSize() {
    if (!canvasRef.current || !canvasParentRef.current) {
      return;
    }

    canvasRef.current.width = canvasParentRef.current.clientWidth;
    canvasRef.current.height = canvasParentRef.current.clientHeight;
  }

  // effect to initialize the emulator on first mount
  useEffect(() => {
    updateCanvasSize();

    controlHubEmulatorView.current = new ControlHubEmulatorView(
      canvasRef.current!,
      controlHubEmulator
    );
    controlHubEmulatorView.current?.beginRendering();

    return () => {
      // remove the emulator
      controlHubEmulatorView.current?.stopRendering();
      controlHubEmulatorView.current = null;
    };
  });

  // effect to resize on resize events
  useEffect(() => {
    const onResize = () => {
      updateCanvasSize();
      controlHubEmulatorView.current?.onresize();
    };

    window.addEventListener("resize", onResize);

    return () => {
      // clean up
      window.removeEventListener("resize", onResize);
    };
  });

  return (
    <div className="control-hub-emulator-comp" ref={canvasParentRef}>
      <canvas className="simulatorWhatShallIPutHere" ref={canvasRef}>
        Canvas is not supported in your browser, try another
      </canvas>
    </div>
  );
};
