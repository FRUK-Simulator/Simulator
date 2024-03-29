import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadSettings } from "../core/settings/settings";
import { RootState } from "../state/store";
import { ExecutionState, ExecutionSpeed, CameraView } from "./vm";

/**
 * Reducer responsible for the execution of the JS
 */
export const vmSlice = createSlice({
  name: "vm",
  initialState: {
    code: null as string | null,
    executionState: ExecutionState.NONE,
    speed: ExecutionSpeed.SLOW,
    view: loadSettings().cameraView,
  },
  reducers: {
    setExecutionState(
      state,
      action: PayloadAction<{ executionState: ExecutionState }>,
    ) {
      state.executionState = action.payload.executionState;
      return state;
    },
    setCode(state, action: PayloadAction<{ code: string }>) {
      state.code = action.payload.code;
      return state;
    },
    setExecutionSpeed(state, action: PayloadAction<{ speed: ExecutionSpeed }>) {
      state.speed = action.payload.speed;

      return state;
    },
    setCameraView(state, action: PayloadAction<{ val: CameraView }>) {
      state.view = action.payload.val;
      return state;
    },
  },
});

export const getExecutionState = (state: RootState) => state.vm.executionState;

/**
 * Returns whether the interpreter has been started or not.
 *
 * @param state the root state of the application
 *
 * @returns true if the interpreter is started, false otherwise.
 */
export const isExecuting = (state: RootState) =>
  state.vm.executionState !== ExecutionState.STOPPED &&
  state.vm.executionState !== ExecutionState.NONE;

/**
 * Retrieves the current JS code generated by blockly.
 *
 * @param state the root state of the application
 *
 * @returns the code as a string
 */
export const getCode = (state: RootState) => state.vm.code;

/**
 * Retrieves the current speed setting stored in the VM
 *
 * @param state the root state of the application
 *
 * @returns the speed setting
 */
export const getExecutionSpeed = (state: RootState) => state.vm.speed;

/**
 * Retrieves the current camera view
 *
 * @param state the root state of the application
 *
 * @returns the camera view
 */
export const getCameraMode = (state: RootState) => state.vm.view;
