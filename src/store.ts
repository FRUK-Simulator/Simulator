import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./User/userReducer";

// Type Safe Reducers - se
const rootReducer = combineReducers({
  user: userReducer.reducer,
});

export type RootState = typeof rootReducer;

export const store = configureStore({
  reducer: rootReducer,
});

// Dispatch Type - See https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export type AppDispatch = typeof store.dispatch;
