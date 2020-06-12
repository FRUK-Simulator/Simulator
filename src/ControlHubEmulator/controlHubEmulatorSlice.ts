import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

/**
 * Reducers for handling the state of the emulator such as whether it is executing or not.
 */
export const controlHubEmulatorSlice = createSlice({
  initialState: {
    dcMotor0Power: 0,
  },
  name: "controlHubEmulator",
  reducers: {
    setDcMotorPower(
      state,
      action: PayloadAction<{ port: number; forward: boolean; power: number }>
    ) {
      state.dcMotor0Power = action.payload.power;
      return state;
    },
  },
});

export const getDcMotor0Power = (state: RootState) =>
  state.controlHubEmulator.dcMotor0Power;
