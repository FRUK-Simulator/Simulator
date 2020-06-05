import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./User/userSlice";
import { robotSimulatorSlice } from "./RobotSimulator/robotSimulatorSlice";
import { blocklySlice } from "./BlocklyInterface/blocklySlice";
import { vmSlice } from "./JavascriptVM/vmReducer";

// Type Safe Reducers - see https://redux-toolkit.js.org/usage/usage-with-typescript#using-configurestore-with-typescript
const rootReducer = combineReducers({
  user: userSlice.reducer,
  simulator: robotSimulatorSlice.reducer,
  blockly: blocklySlice.reducer,
  vm: vmSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});

// Dispatch Type - See https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export type AppDispatch = typeof store.dispatch;
