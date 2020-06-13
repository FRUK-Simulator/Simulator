import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { vmSlice } from "../JavascriptVM/vmSlice";

/**
 * Reducers for handling the state of the blockly interface such as which blocks are highlighted.
 */
export const blocklySlice = createSlice({
  initialState: {
    /** The id of the block to highlight - empty string means no block is highlighted */
    highlightedBlock: "",
    /** The id of the current block selection - an empty string designates no selection */
    selectedBlock: "",
    /** The id of the previously selected block - an empty string designates no selection */
    previousBlock: "",
  },
  name: "blockly",
  reducers: {
    highlightBlock(state, action: PayloadAction<{ blockId: string }>) {
      state.highlightedBlock = action.payload.blockId;

      return state;
    },
    selectedBlock(state, action: PayloadAction<{ blockId: string }>) {
      const changed = action.payload.blockId !== state.selectedBlock;

      const newState = {
        selectedBlock: action.payload.blockId,
        previousBlock: changed ? state.selectedBlock : state.previousBlock,
      };

      return Object.assign({}, state, newState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(vmSlice.actions.stopExecution, (state) => {
      const newState = {
        // Passing a fake block id guarantees to unhighlight all blocks
        highlightedBlock: "UNHIGHLIGHT_BLOCKS",
        // Set block selection based on previous selection
        selectedBlock: state.previousBlock,
      };

      return Object.assign({}, state, newState);
    });

    builder.addCase(vmSlice.actions.startExecution, (state) => {
      const newState = {
        // Clear block selection when starting execution
        previousBlock: state.selectedBlock,
        selectedBlock: "",
      };

      return Object.assign({}, state, newState);
    });
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

/**
 * Retrieves the previously selected blockly block's ID.
 *
 * @param state the root state of the application
 *
 * @returns the previously selected blockly block's ID
 */
export const getCurrentBlockSelection = (state: RootState) =>
  state.blockly.selectedBlock;

/**
 * Retrieves the previously selected blockly block's ID.
 *
 * @param state the root state of the application
 *
 * @returns the previously selected blockly block's ID
 */
export const getPreviousBlockSelection = (state: RootState) =>
  state.blockly.previousBlock;
