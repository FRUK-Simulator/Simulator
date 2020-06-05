import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Reducers for handling the state of the blockly interface such as which blocks are highlighted.
 */
export const blocklyReducer = createSlice({
  initialState: {
    /** The id of the block to highlight */
    highlightedBlock: "" as string | null,
    /** The current generated code */
    code: null as string | null,
  },
  name: "blockly",
  reducers: {
    highlightBlock(state, action: PayloadAction<{ blockId: string }>) {
      state.highlightedBlock = action.payload.blockId;
      return state;
    },
    setCode(state, action: PayloadAction<{ code: string }>) {
      state.code = action.payload.code;
      return state;
    },
  },
});
