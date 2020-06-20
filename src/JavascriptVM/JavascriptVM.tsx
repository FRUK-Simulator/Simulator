import { FunctionComponent, useState, createContext } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { vmSlice } from "./vmSlice";
import { getCode } from "./vmSlice";
import { AppDispatch } from "../store";
import { BlocklyInterpreter, ExecutionState } from "./vm";
import { blocklySlice } from "../BlocklyInterface/blocklySlice";

import "./JavascriptVM.css";
import { robotSimulatorSlice } from "../RobotSimulator/robotSimulatorSlice";

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
  const dispatch = useDispatch<AppDispatch>();
  const code = useSelector(getCode);

  /**
   * Syncs the redux state with the interpreter state.
   */
  function syncExecutionState(interpreter?: BlocklyInterpreter) {
    dispatch(
      vmSlice.actions.setExecutionState({
        executionState: interpreter?.getExecutionState() || ExecutionState.NONE,
      })
    );
  }

  return (
    <VMContext.Provider
      value={{
        run() {
          if (!interpreter) {
            console.warn("vm is not started");
            return;
          }

          interpreter.run();
          syncExecutionState(interpreter);
        },
        pause() {
          if (!interpreter) {
            console.warn("vm is not started");
            return;
          }

          interpreter.pause();
          syncExecutionState(interpreter);
        },
        step() {
          if (!interpreter) {
            console.warn("vm is not started");
            return;
          }

          interpreter?.step();
          syncExecutionState(interpreter);
        },
        stop() {
          if (!interpreter) {
            console.warn("vm is not started");
            return;
          }

          interpreter.stop();
          syncExecutionState(interpreter);
          setInterpreter(null);
        },
        start() {
          if (!code) {
            return;
          }

          const interpreter = new BlocklyInterpreter(code, {
            onHighlight: (id) => {
              dispatch(blocklySlice.actions.highlightBlock({ blockId: id }));
            },

            onSetMotorPower: (channel: number, power: number) => {
              dispatch(
                robotSimulatorSlice.actions.setPower({ channel, power })
              );
            },

            onIsSensorTouchPushed: (channel: number): boolean => {
              return true;
            },

            onFinish: () => {
              syncExecutionState(interpreter);
              setInterpreter(null);
            },
          });

          syncExecutionState(interpreter);
          setInterpreter(interpreter);
        },
      }}
    >
      {children}
    </VMContext.Provider>
  );
};
