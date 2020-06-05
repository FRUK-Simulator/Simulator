import { FunctionComponent, useState } from "react";
import React from "react";

import "./JavascriptVM.css";
import { useSelector, useDispatch } from "react-redux";
import { isExecuting, vmSlice } from "./vmSlice";
import { getCode } from "./vmSlice";
import { AppDispatch } from "../store";
import { getIntepreter } from "./vm";
import Interpreter from "js-interpreter";

export const JavascriptVM: FunctionComponent = () => {
  const [interpreter, setInterpreter] = useState<Interpreter | null>(null);
  const executing = useSelector(isExecuting);
  const dispatch = useDispatch<AppDispatch>();
  const code = useSelector(getCode);

  const startButton = (
    <button
      disabled={!code}
      onClick={() => {
        if (!code) {
          return;
        }
        dispatch(vmSlice.actions.startExecution());
        setInterpreter(getIntepreter(code, dispatch));
      }}
    >
      Start
    </button>
  );

  const stopButton = (
    <button
      onClick={() => {
        dispatch(vmSlice.actions.stopExecution());
        setInterpreter(null);
      }}
    >
      Stop
    </button>
  );

  const stepButton = (
    <button
      onClick={() => {
        interpreter?.step();
      }}
    >
      Step
    </button>
  );

  const runButton = (
    <button
      onClick={() => {
        interpreter?.run();
      }}
    >
      Run
    </button>
  );

  const runButtons = [runButton, stepButton];

  return (
    <div className="javascript-vm">
      <div>
        {executing ? runButtons : startButton}
        {executing && stopButton}
      </div>
      <pre>{code}</pre>
    </div>
  );
};
