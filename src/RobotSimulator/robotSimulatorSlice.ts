import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../state/store";

interface IRobotSimulatorState {
  motors: {
    [channel: number]: number;
  };
}

/**
 * Reducers for handling the state of the simulator such as whether it is executing or not.
 */
export const robotSimulatorSlice = createSlice({
  initialState: {
    motors: {},
  } as IRobotSimulatorState,
  name: "simulator",
  reducers: {
    setPower(state, action: PayloadAction<{ channel: number; power: number }>) {
      state.motors[action.payload.channel] = action.payload.power;

      return state;
    },
  },
});

export const getMotorPower = (channel: number) => (state: RootState) =>
  state.simulator.motors[channel] || 0;

export const getMotorStats = (state: RootState) =>
  Object.entries(state.simulator.motors);
