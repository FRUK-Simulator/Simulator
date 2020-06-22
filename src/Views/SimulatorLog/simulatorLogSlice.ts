import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { vmSlice } from "../../JavascriptVM/vmSlice";
import { ExecutionState } from "../../JavascriptVM/vm";
import { robotSimulatorSlice } from "../../RobotSimulator/robotSimulatorSlice";

function createLogEntry(port: number, power: number): ILogEntry {
  return {
    timestamp: new Date().toISOString(),
    command: "set DC Motor on port " + port + " to " + power + "%",
  };
}

export interface ILogEntry {
  timestamp: String;
  command: String;
}

export interface IExecutionLogState {
  logs: ILogEntry[];
}

/**
 * Reducers for handling the state of the simulator such as whether it is executing or not.
 */
export const simulatorLogSlice = createSlice({
  initialState: {
    logs: [] as ILogEntry[],
  } as IExecutionLogState,
  name: "executionLog",
  reducers: {},
  extraReducers: (builder) =>
    // listen on robotSimulator events
    builder
      .addCase(robotSimulatorSlice.actions.setPower, (state, action) => {
        const logEntry = createLogEntry(
          action.payload.channel,
          action.payload.power
        );
        state.logs.push(logEntry);
        return state;
      })
      // listen on vm events
      .addCase(vmSlice.actions.setExecutionState, (state, action) => {
        if (action.payload.executionState === ExecutionState.RUNNING) {
          // creating a new execution log
          state.logs = [] as ILogEntry[];
        }
        return state;
      }),
});

export const getCurrentExecution = () => (state: RootState) => state.logs;
