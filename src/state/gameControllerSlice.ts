import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export enum ControllerKey {
  Y = "Y",
  X = "X",
  DpadUp = "DpadUp",
  DpadRight = "DpadRight",
  A = "A",
  B = "B",
  DpadDown = "DpadDown",
  DpadLeft = "DpadLeft",
}

type controllerState = {
  [key in ControllerKey]: boolean;
};

const CONTROLLER_STATES: controllerState = {
  Y: false,
  X: false,
  DpadUp: false,
  DpadRight: false,
  A: false,
  B: false,
  DpadDown: false,
  DpadLeft: false,
};

/**
 * Reducer covering game controller events
 */
export const gameControllerSlice = createSlice({
  name: "gameController",
  initialState: {
    buttonStates: CONTROLLER_STATES,
    visible: false,
  },
  reducers: {
    setControllerKeyState(
      state,
      keyPress: PayloadAction<{ key: ControllerKey; value: boolean }>
    ) {
      state.buttonStates[keyPress.payload.key] = keyPress.payload.value;

      return state;
    },
    showController(state) {
      return {
        ...state,
        visible: true,
      };
    },
    hideController(state) {
      return {
        ...state,
        visible: false,
      };
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
export const getControllerKeys = (state: RootState) =>
  state.gameController.buttonStates;

export const isControllerVisible = (state: RootState) =>
  state.gameController.visible;
