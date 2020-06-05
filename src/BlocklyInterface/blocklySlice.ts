import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

/**
 * Reducers for handling the state of the blockly interface such as which blocks are highlighted.
 */
export const blocklySlice = createSlice({
  initialState: {
    /** The id of the block to highlight */
    highlightedBlock: "" as string | null,
  },
  name: "blockly",
  reducers: {
    highlightBlock(state, action: PayloadAction<{ blockId: string }>) {
      state.highlightedBlock = action.payload.blockId;
      return state;
    },
  },
});

/**
 * Retrieves the ID of the highlighted block.
 *
 * @param state the root state of the application
 *
 * @returns the highlighted block id
 */
export const getHighlightedBlockId = (state: RootState) =>
  state.blockly.highlightedBlock;
