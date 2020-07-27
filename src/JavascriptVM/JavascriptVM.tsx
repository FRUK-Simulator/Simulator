import {
  FunctionComponent,
  useState,
  createContext,
  useEffect,
  useRef,
  useContext,
} from "react";
import React from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { vmSlice } from "./vmSlice";
import { getCode } from "./vmSlice";
import { AppDispatch } from "../store";
import {
  BlocklyInterpreter,
  ExecutionState,
  BlocklyInterpreterCallbacks,
} from "./vm";
import { blocklySlice } from "../BlocklyInterface/blocklySlice";
import "./JavascriptVM.css";
import { robotSimulatorSlice } from "../RobotSimulator/robotSimulatorSlice";
import { messageSlice } from "../ErrorViews/messagesSlice";
import { MessageBarType } from "@fluentui/react";
import Blockly from "blockly";
import { Sim3D } from "@fruk/simulator-core";
import { StdWorldBuilder } from "../RobotSimulator/StdWorldBuilder";
import { Handles } from "@fruk/simulator-core";
import {
  ArenaConfig,
  getArenaConfig,
} from "../RobotSimulator/ArenaConfigLoader";
import { ControllerKey } from "../ControlPanel/GameController/gameControllerSlice";

/**
 * Interface to control the VM
 */
export interface IVirtualMachine {
  run: () => void;
  step: () => void;
  stop: () => void;
  start: () => void;
  pause: () => void;

  setArena: (name: string) => void;

  // Called to start the simulator and setup the initial scene
  onCanvasCreated: (canvas: HTMLCanvasElement) => void;
  onCanvasDestroyed: (canvasEl: HTMLCanvasElement) => void;

  // Holds a handle to the robot in the curent scene.
  robot: Handles.RobotHandle;
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

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sim = useRef<Sim3D | null>(null);
  const robotRef = useRef<Handles.RobotHandle | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const code = useSelector(getCode);

  const store = useStore();

  // handler for robot handlers, all calls to setMotorPower will update state in redux
  const robot_handler: ProxyHandler<Handles.RobotHandle> = {
    get: function (target, property, receiver) {
      if (property === "setMotorPower") {
        const originalImpl = target[property];
        return function (channel: number, power: number) {
          dispatch(
            robotSimulatorSlice.actions.setPower({
              channel: channel,
              power: power,
            })
          );
          return originalImpl.apply(target, [channel, power]);
        };
      }

      return Reflect.get(target, property, receiver);
    },
  };

  /**
   * Syncs the redux state with the interpreter state.
   */
  function syncExecutionState(interpreter: BlocklyInterpreter | null) {
    dispatch(
      vmSlice.actions.setExecutionState({
        executionState: interpreter?.getExecutionState() || ExecutionState.NONE,
      })
    );
  }

  // Sets the canvas width and height properties to match the parent
  function updateCanvasSize() {
    if (!canvasRef.current) {
      return;
    }

    let canvasParentEl = canvasRef.current.parentElement!;

    canvasRef.current.width = canvasParentEl.clientWidth;
    canvasRef.current.height = canvasParentEl.clientHeight;
  }

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
          console.log(code);
          if (!code) {
            return;
          }

          const callbacks: BlocklyInterpreterCallbacks = {
            onHighlight: (id) => {
              dispatch(blocklySlice.actions.highlightBlock({ blockId: id }));
            },

            onSetMotorPower: (channel: number, power: number) => {
              robotRef.current?.setMotorPower(channel, power);
            },

            onFinish: () => {
              syncExecutionState(interpreter);
              setInterpreter(null);
              dispatch(
                messageSlice.actions.addMessage({
                  type: MessageBarType.success,
                  msg: "Program finished!",
                })
              );
            },

            onIsSensorTouchPushed: (channel: number): boolean => {
              return true;
            },

            onControllerKeyCheck: (key: ControllerKey): boolean => {
              return store.getState().gameController[key];
            },
            getSensorValue: (channel: number): number => {
              const value = robotRef.current?.getAnalogInput(channel);
              if (value) {
                return value;
              }
              return 0.0;
            },
          };

          try {
            // Log the Blockly workspace into the web-console. Could be used to copy/past demo programs.
            const xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
            console.log(Blockly.Xml.domToText(xml));

            const interpreter = new BlocklyInterpreter(code, callbacks);
            setInterpreter(interpreter);
            syncExecutionState(interpreter);
          } catch (err) {
            dispatch(
              messageSlice.actions.addMessage({
                type: MessageBarType.error,
                msg: "Code cannot be executed.",
              })
            );
          }
        },
        setArena(name: string): void {
          let arenaConfig: ArenaConfig = getArenaConfig(name);
          sim.current?.configureWorld(arenaConfig.worldConfig);
          const robot = new StdWorldBuilder(sim.current!).build();
          robotRef.current = new Proxy(robot!, robot_handler);
          arenaConfig.ballSpecs?.forEach(function (ballSpec, index) {
            sim.current?.addBall(ballSpec);
          });
          arenaConfig.boxSpecs?.forEach(function (boxSpec, index) {
            sim.current?.addBox(boxSpec);
          });
          arenaConfig.coneSpecs?.forEach(function (coneSpec, index) {
            sim.current?.addCone(coneSpec);
          });
        },
        onCanvasCreated(canvasEl: HTMLCanvasElement) {
          canvasRef.current = canvasEl;
          updateCanvasSize();
          // create the simulator
          sim.current = new Sim3D(canvasEl);
          const robot = new StdWorldBuilder(sim.current).build();
          sim.current.beginRendering();
          robotRef.current = new Proxy(robot!, robot_handler);
        },
        onCanvasDestroyed(canvasEl: HTMLCanvasElement) {
          // remove the simulator
          sim.current?.stopRendering();
          sim.current = null;
          robotRef.current = null;
        },
        get robot(): Handles.RobotHandle {
          return robotRef.current!;
        },
      }}
    >
      {children}
    </VMContext.Provider>
  );
};

export function useVM(): IVirtualMachine {
  return useContext(VMContext) as IVirtualMachine;
}
