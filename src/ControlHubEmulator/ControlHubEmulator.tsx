import React, { FunctionComponent, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import "./ControlHubEmulator.css";
import { getDcMotor0Power } from "./controlHubEmulatorSlice";
import { getDcMotor1Power } from "./controlHubEmulatorSlice";
import { getDcMotor2Power } from "./controlHubEmulatorSlice";
import { getDcMotor3Power } from "./controlHubEmulatorSlice";
import { ControlHubEmulator } from "@fruk/control-hub-emulator-core/dist/engine/ControlHubEmulator";
import { ControlHubEmulatorView } from "@fruk/control-hub-emulator-core";

type ControlHubEmulatorProps = {
  controlHubEmulator: ControlHubEmulator;
};

// This component coordinates between react html and the canvas. It uses the ControlHubEmulatorView class to handle the UI and
// proxies all required events from the browsers into the ControlHubEmulatorView. All react redux integration is done at this level.
export const ControlHubEmulatorComp: FunctionComponent<ControlHubEmulatorProps> = (
  props: ControlHubEmulatorProps
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasParentRef = useRef<HTMLDivElement>(null);
  const dcMotor0Power = useSelector(getDcMotor0Power);
  const dcMotor1Power = useSelector(getDcMotor1Power);
  const dcMotor2Power = useSelector(getDcMotor2Power);
  const dcMotor3Power = useSelector(getDcMotor3Power);

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
      props.controlHubEmulator
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

  useEffect(() => {
    if (controlHubEmulatorView.current && dcMotor0Power) {
      props.controlHubEmulator.setDcMotorPower(0, dcMotor0Power);
    }
  }, [dcMotor0Power, props]);

  useEffect(() => {
    if (controlHubEmulatorView.current && dcMotor1Power) {
      props.controlHubEmulator.setDcMotorPower(1, dcMotor1Power);
    }
  }, [dcMotor1Power, props]);

  useEffect(() => {
    if (controlHubEmulatorView.current && dcMotor2Power) {
      props.controlHubEmulator.setDcMotorPower(2, dcMotor2Power);
    }
  }, [dcMotor2Power, props]);

  useEffect(() => {
    if (controlHubEmulatorView.current && dcMotor3Power) {
      props.controlHubEmulator.setDcMotorPower(3, dcMotor3Power);
    }
  }, [dcMotor3Power, props]);

  return (
    <div className="control-hub-emulator-comp" ref={canvasParentRef}>
      <canvas className="simulatorWhatShallIPutHere" ref={canvasRef}>
        Canvas is not supported in your browser, try another
      </canvas>
    </div>
  );
};
