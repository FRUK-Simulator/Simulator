import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

/**
 * Reducers for handling the state of the emulator such as whether it is executing or not.
 */
export const controlHubEmulatorSlice = createSlice({
  initialState: {
    dcMotor1Power: 0,
  },
  name: "controlHubEmulator",
  reducers: {
    setDcMotorPower(
      state,
      action: PayloadAction<{ port: number; forward: boolean; power: number }>
    ) {
      state.dcMotor1Power = action.payload.power;
      return state;
    },
  },
});

export const getDcMotor1Power = (state: RootState) =>
  state.controlHubEmulator.dcMotor1Power;
