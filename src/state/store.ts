import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "../User/userSlice";
import { robotSimulatorSlice } from "../RobotSimulator/robotSimulatorSlice";
import {
  blocklySlice,
  loadBlocklyState,
  saveBlocklyState,
} from "../BlocklyInterface/blocklySlice";
import { vmSlice } from "../JavascriptVM/vmSlice";
import { messageSlice } from "./messagesSlice";
import { simulatorLogSlice } from "../ControlPanel/SimulatorLog/simulatorLogSlice";
import { editorSlice } from "../Editor/editorSlice";
import { gameControllerSlice } from "./gameControllerSlice";
import { challengeSlice } from "../RobotSimulator/Arenas/challengeSlice";

// Type Safe Reducers - see https://redux-toolkit.js.org/usage/usage-with-typescript#using-configurestore-with-typescript
const rootReducer = combineReducers({
  user: userSlice.reducer,
  simulator: robotSimulatorSlice.reducer,
  blockly: blocklySlice.reducer,
  vm: vmSlice.reducer,
  messages: messageSlice.reducer,
  logs: simulatorLogSlice.reducer,
  editor: editorSlice.reducer,
  gameController: gameControllerSlice.reducer,
  challenge: challengeSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    blockly: loadBlocklyState(),
  },
});

store.subscribe(() => saveBlocklyState(store.getState()));

// Dispatch Type - See https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export type AppDispatch = typeof store.dispatch;
