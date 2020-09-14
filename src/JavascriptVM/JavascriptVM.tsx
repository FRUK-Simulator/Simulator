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
import { vmSlice, getCode } from "./vmSlice";
import { AppDispatch } from "../state/store";
import {
  BlocklyInterpreter,
  ExecutionState,
  ExecutionSpeed,
  BlocklyInterpreterCallbacks,
} from "./vm";
import { blocklySlice } from "../BlocklyInterface/blocklySlice";
import "./JavascriptVM.css";
import { robotSimulatorSlice } from "../RobotSimulator/robotSimulatorSlice";
import { MessageType, messageSlice } from "../state/messagesSlice";
import Blockly from "blockly";
import { Sim3D } from "@fruk/simulator-core";
import { StdWorldBuilder } from "../RobotSimulator/StdWorldBuilder";
import { Handles, CoreSpecs } from "@fruk/simulator-core";
import { ControllerKey } from "../ControlPanel/GameController/gameControllerSlice";
import {
  ChallengeConfig,
  ChallengeListener,
} from "../RobotSimulator/Areanas/base";
import { ChallengeActionsImpl } from "./ChallengeActionsImpl";
import { getDefaultChallenge } from "../RobotSimulator/ChallengeConfigLoader";

/**
 * Interface to control the VM
 */
export interface IVirtualMachine {
  run: () => void;
  step: () => void;
  stop: () => void;
  start: () => void;
  pause: () => void;

  setChallenge: (config: ChallengeConfig) => void;

  updateSpeed: (speed: ExecutionSpeed) => void;

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
  const challengeListener = useRef<ChallengeListener | null>(null);

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

  /**
   * Syncs the redux state with the interpreter state.
   */
  function syncExecutionSpeed(speed: ExecutionSpeed) {
    dispatch(vmSlice.actions.setExecutionSpeed({ speed }));
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

              sim.current?.setPhysicsActive(false);

              dispatch(
                messageSlice.actions.addMessage({
                  type: MessageType.success,
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

            const interpreter = new BlocklyInterpreter(
              code,
              store.getState().vm.speed,
              callbacks
            );
            setInterpreter(interpreter);
            syncExecutionState(interpreter);
          } catch (err) {
            dispatch(
              messageSlice.actions.addMessage({
                type: MessageType.danger,
                msg: "Code cannot be executed.",
              })
            );
          }
        },
        updateSpeed(speed: ExecutionSpeed): void {
          interpreter?.setSpeed(speed);
          syncExecutionSpeed(speed);
        },
        setChallenge(challengeConfig: ChallengeConfig): void {
          if (!sim.current) return;

          const simulator = sim.current;
          const arena = challengeConfig.arenaConfig;

          simulator?.configureWorld(arena.worldConfig);

          const robot = new StdWorldBuilder(
            simulator,
            challengeConfig.startPosition
          ).build();

          robotRef.current = new Proxy(robot!, robot_handler);

          arena.ballSpecs?.forEach(function (ballSpec) {
            simulator.addBall(ballSpec);
          });

          arena.boxSpecs?.forEach(function (boxSpec) {
            simulator.addBox(boxSpec);
          });

          arena.coneSpecs?.forEach(function (coneSpec) {
            simulator.addCone(coneSpec);
          });

          if (challengeListener.current) {
            challengeListener.current.onStop();
          }

          challengeListener.current = challengeConfig.eventListener || null;
          challengeListener.current?.onStart(
            new ChallengeActionsImpl(simulator, dispatch)
          );
        },
        onCanvasCreated(canvasEl: HTMLCanvasElement) {
          canvasRef.current = canvasEl;
          updateCanvasSize();
          // create the simulator
          sim.current = new Sim3D(canvasEl);
          const robot = new StdWorldBuilder(sim.current, {
            x: 0,
            y: 0,
          }).build();
          sim.current.beginRendering();
          robotRef.current = new Proxy(robot!, robot_handler);
          sim.current?.addListener(
            "simulation-event",
            (event: CoreSpecs.ISimulatorEvent) => {
              if (event.type === "zone-entry") {
                challengeListener.current?.onEvent({
                  kind: "ZoneEvent",
                  entry: true,
                  zoneId: event.data.zoneId,
                });
              }
            }
          );
          this.setChallenge(getDefaultChallenge());
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
