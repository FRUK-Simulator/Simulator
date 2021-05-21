import { IRobotSpec } from "@fruk/simulator-core/dist/engine/specs/RobotSpecs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../state/store";

interface IRobotSimulatorState {
  motors: {
    [channel: number]: number;
  };
  roboSpec: IRobotSpec;
}

/**
 * Reducers for handling the state of the simulator such as whether it is executing or not.
 */
export const robotSimulatorSlice = createSlice({
  initialState: {
    motors: {},
    roboSpec: {},
  } as IRobotSimulatorState,
  name: "simulator",
  reducers: {
    setPower(state, action: PayloadAction<{ channel: number; power: number }>) {
      state.motors[action.payload.channel] = action.payload.power;

      return state;
    },
    setRobotSpec(state, action: PayloadAction<{ spec: IRobotSpec }>) {
      state.roboSpec = action.payload.spec;
    },
  },
});

export const getMotorPower = (channel: number) => (state: RootState) =>
  state.simulator.motors[channel] || 0;

export const getMotorStats = (state: RootState) =>
  Object.entries(state.simulator.motors);

export const getRoboSpec = (state: RootState) => state.simulator.roboSpec;
