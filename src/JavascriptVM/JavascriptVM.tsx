import { FunctionComponent, useState, createContext } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  isExecuting,
  vmSlice,
  getExecutionStatus,
  ExecutionStatus,
} from "./vmSlice";
import { getCode } from "./vmSlice";
import { AppDispatch } from "../store";
import { BlocklyInterpreter } from "./vm";
import { blocklySlice } from "../BlocklyInterface/blocklySlice";

import "./JavascriptVM.css";

/**
 * Interface to control the VM
 */
export interface IVirtualMachine {
  run: () => void;
  step: () => void;
  stop: () => void;
  start: () => void;
  pause: () => void;
}

/**
 * Global interface to control the JS Virtual Machine.
 */
export const VMContext = createContext<IVirtualMachine | null>(null);

/**
 * Inserts an interface that manages the JS VM into the React context tree. Manages
 * the VM and fires redux actions to expose the state of the VM. Can be accessed
 * via the `useContext` hook.
 *
 * Renders the children underneath a context provider.
 *
 * @example
 * const vmControls = useContext(VMContext);
 * vmControls.start();
 */
export const VMProvider: FunctionComponent = ({ children }) => {
  const [interpreter, setInterpreter] = useState<BlocklyInterpreter | null>(
    null
  );
  const executing = useSelector(isExecuting);
  const executionStatus = useSelector(getExecutionStatus);
  const dispatch = useDispatch<AppDispatch>();
  const code = useSelector(getCode);

  return (
    <VMContext.Provider
      value={{
        run() {
          if (!interpreter) {
            console.warn("vm is not started");
            return;
          }

          if (executionStatus === ExecutionStatus.PAUSED) {
            interpreter.unpause();
            dispatch(vmSlice.actions.run());
          } else {
            dispatch(vmSlice.actions.run());
            interpreter.run().then(() => {
              dispatch(vmSlice.actions.stopExecution());
              setInterpreter(null);
            });
          }
        },
        pause() {
          if (!interpreter) {
            console.warn("vm is not started");
            return;
          }

          interpreter.pause();
          dispatch(vmSlice.actions.pause());
        },
        step() {
          if (!interpreter) {
            console.warn("vm is not started");
            return;
          }

          const finished = interpreter?.step();

          if (finished) {
            dispatch(vmSlice.actions.stopExecution());
            setInterpreter(null);
          }
        },
        stop() {
          if (!interpreter) {
            console.warn("vm is not started");
            return;
          }

          interpreter.stop();
          dispatch(vmSlice.actions.stopExecution());
          setInterpreter(null);
        },
        start() {
          if (!code) {
            return;
          }

          if (executing) {
            console.warn("already executing");
            return;
          }

          dispatch(vmSlice.actions.startExecution());
          setInterpreter(
            new BlocklyInterpreter(code, {
              onHighlight: (id) =>
                dispatch(blocklySlice.actions.highlightBlock({ blockId: id })),
            })
          );
        },
      }}
    >
      {children}
    </VMContext.Provider>
  );
};
