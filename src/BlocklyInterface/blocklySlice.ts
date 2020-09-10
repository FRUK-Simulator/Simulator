import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../state/store";
import { vmSlice } from "../JavascriptVM/vmSlice";
import { ExecutionState } from "../JavascriptVM/vm";
import { getDefaultToolbox } from "./toolbox";

/**
 * Reducers for handling the state of the blockly interface such as which blocks are highlighted.
 */
export const blocklySlice = createSlice({
  initialState: {
    /** The id of the block to highlight - empty string means no block is highlighted */
    highlightedBlock: "",
    /** The id of the current block selection - an empty string designates no selection */
    selectedBlock: "",
    /** Flag which indicates if the toolbox is visible or not */
    showToolbox: true,
    /** current definition of the toolbox. Blockly only supports one toolbox so we have
     *  update this one to simulate multiple toolboxes */
    toolboxXml: getDefaultToolbox(),
  },
  name: "blockly",
  reducers: {
    highlightBlock(state, action: PayloadAction<{ blockId: string }>) {
      state.highlightedBlock = action.payload.blockId;

      return state;
    },
    selectedBlock(state, action: PayloadAction<{ blockId: string }>) {
      state.selectedBlock = action.payload.blockId;

      return state;
    },
    showToolbox(state, action: PayloadAction<{ visible: boolean }>) {
      state.showToolbox = action.payload.visible;

      return state;
    },
    setToolboxXml(state, action: PayloadAction<{ toolboxXml: string }>) {
      state.toolboxXml = action.payload.toolboxXml;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(vmSlice.actions.setExecutionState, (state, action) => {
      if (
        action.payload.executionState === ExecutionState.STOPPED ||
        action.payload.executionState === ExecutionState.NONE
      ) {
        // Passing a fake block id guarantees to unhighlight all blocks
        state.highlightedBlock = "UNHIGHLIGHT_BLOCKS";
      }

      // Clear block selection once VM execution fterminated
      state.selectedBlock = "";

      return state;
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
 * Retrieves the flag which indicates if the toolbox is visible or not.
 *
 * @param state the root state of the application
 *
 * @returns the toolbox' visibility flag
 */
export const isShowToolbox = (state: RootState) => state.blockly.showToolbox;

/**
 * Retrieves the current definition of the toolbox
 *
 * @param state the root state of the application
 *
 * @returns the definition of the toolbox
 */
export const getToolboxXml = (state: RootState) => state.blockly.toolboxXml;
