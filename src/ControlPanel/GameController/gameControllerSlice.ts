import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export enum ControllerKey {
  A = "A",
}

type controllerState = {
  [key in ControllerKey]: boolean;
};

const CONTROLLER_STATES: controllerState = {
  A: false,
};

/**
 * Reducer covering game controller events
 */
export const gameControllerSlice = createSlice({
  name: "gameController",
  initialState: CONTROLLER_STATES,
  reducers: {
    setControllerKeyState(
      state,
      keyPress: PayloadAction<{ key: ControllerKey; value: boolean }>
    ) {
      state[keyPress.payload.key] = keyPress.payload.value;

      return state;
    },
  },
});

/**
 * Retrieves the game controller state per key.
 *
 * @param state the root state of the application
 *
 * @returns the currently selected Editor type
 */
export const getControllerKeys = (state: RootState) => state.gameController;
