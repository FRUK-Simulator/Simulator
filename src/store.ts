import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./User/userReducer";
import { robotSimulatorReducer } from "./RobotSimulator/robotSimulatorReducer";
import { blocklyReducer } from "./BlocklyInterface/blocklyReducer";

// Type Safe Reducers - see https://redux-toolkit.js.org/usage/usage-with-typescript#using-configurestore-with-typescript
const rootReducer = combineReducers({
  user: userReducer.reducer,
  simulator: robotSimulatorReducer.reducer,
  blockly: blocklyReducer.reducer,
});

export type RootState = typeof rootReducer;

export const store = configureStore({
  reducer: rootReducer,
});

// Dispatch Type - See https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export type AppDispatch = typeof store.dispatch;
