import { FunctionComponent, useState, createContext } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { isExecuting, vmSlice } from "./vmSlice";
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

          interpreter?.run();
          dispatch(vmSlice.actions.stopExecution());
          setInterpreter(null);
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

              // dummy implementations
              onSetDcMotorPower: (port: number, power: number) =>
                console.log(
                  "onSetDcMotorPower port " + port + " power " + power
                ),

              onIsSensorTouchPushed: (port: number): boolean => true,
            })
          );
        },
      }}
    >
      {children}
    </VMContext.Provider>
  );
};
