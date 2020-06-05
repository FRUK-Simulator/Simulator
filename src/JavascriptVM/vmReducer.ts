import { createSlice } from "@reduxjs/toolkit";
import { blocklySlice } from "../BlocklyInterface/blocklySlice";
import Interpreter, { GlobalObject } from "js-interpreter";
import { store } from "../store";

export enum ExecutionStatus {
  RUNNING,
  STOPPED,
  PAUSED,
}

function initInterpreter(intepreter: Interpreter, globalObject: GlobalObject) {
  const highlightBlock = intepreter.createNativeFunction((id: string) => {
    store.dispatch(blocklySlice.actions.highlightBlock({ blockId: id }));
  });

  intepreter.setProperty(globalObject, "highlightBlock", highlightBlock);
}

/**
 * Reducer responsible for the execution of the JS
 */
export const vmSlice = createSlice({
  name: "vm",
  initialState: {
    code: null as string | null,
    status: ExecutionStatus.STOPPED,
    interpreter: null as Interpreter | null,
  },
  reducers: {
    startExecution(state) {
      if (state.code) {
        state.interpreter = new Interpreter(state.code, initInterpreter);
        state.status = ExecutionStatus.RUNNING;
      }

      return state;
    },
    step(state) {
      if (state.interpreter) {
        state.interpreter.step();
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(blocklySlice.actions.setCode, (state, action) => {
      state.code = action.payload.code;
    });
  },
});
