import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

/**
 * Reducers for handling the state of the emulator such as whether it is executing or not.
 */
export const controlHubEmulatorSlice = createSlice({
  initialState: {
    dcMotorPower: [0, 0, 0, 0],
  },
  name: "controlHubEmulator",
  reducers: {
    setDcMotorPower(
      state,
      action: PayloadAction<{ port: number; power: number }>
    ) {
      state.dcMotorPower[action.payload.port] = action.payload.power;
      return state;
    },
  },
});

export const getDcMotor0Power = (state: RootState) =>
  state.controlHubEmulator.dcMotorPower[0];
export const getDcMotor1Power = (state: RootState) =>
  state.controlHubEmulator.dcMotorPower[1];
export const getDcMotor2Power = (state: RootState) =>
  state.controlHubEmulator.dcMotorPower[2];
export const getDcMotor3Power = (state: RootState) =>
  state.controlHubEmulator.dcMotorPower[3];
