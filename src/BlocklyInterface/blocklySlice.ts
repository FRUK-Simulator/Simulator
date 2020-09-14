import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "../state/store";
import { vmSlice } from "../JavascriptVM/vmSlice";
import { ExecutionState } from "../JavascriptVM/vm";
import { getDefaultToolbox } from "./toolbox";
import {
  BlocklyProgram,
  getPredefinedBlocklyProgs,
} from "../core/blockly/programs";

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
    /** Array of blockly programs */
    blocklyPrograms: getPredefinedBlocklyProgs() as BlocklyProgram[],
    /** The id of the blockly program that is currently selected - an empty string
     * designates no selection */
    activeBlocklyProgramId: getPredefinedBlocklyProgs()[0].title,
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
    addBlockyProgram(state, action: PayloadAction<{ prog: BlocklyProgram }>) {
      // If the program already exists then we update it.
      for (let i = 0; i < state.blocklyPrograms.length; ++i) {
        if (state.blocklyPrograms[i].title === action.payload.prog.title) {
          state.blocklyPrograms[i] = action.payload.prog;
          return state;
        }
      }

      // If the program is new we add it to the end of the array.
      state.blocklyPrograms.push(action.payload.prog);
      return state;
    },
    removeBlockyProgram(state, action: PayloadAction<{ title: string }>) {
      let ind = -1;
      for (let i = 0; i < state.blocklyPrograms.length; ++i) {
        if (state.blocklyPrograms[i].title === action.payload.title) {
          ind = i;
        }
      }

      if (ind !== -1) {
        state.blocklyPrograms.splice(ind, 1);
      }

      return state;
    },
    setActiveBlocklyProgramId(state, action: PayloadAction<{ title: string }>) {
      state.activeBlocklyProgramId = action.payload.title;
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

const localStorageKey = "fruk-blockly-slice-state";

export const loadBlockyState = () => {
  try {
    const serializedState = localStorage.getItem(localStorageKey);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveBlocklyState = () => {
  try {
    const serializedState = JSON.stringify(store.getState().blockly);
    localStorage.setItem(localStorageKey, serializedState);
  } catch {}
};

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

/**
 * Retrieves the ID of the blockly program that is currently active.
 *
 * @param state the root state of the application
 *
 * @returns the active blockly program id
 */
export const getActiveBlocklyProgramId = (state: RootState) =>
  state.blockly.activeBlocklyProgramId;

/**
 * Retrieves the available blockly programs
 *
 * @param state the root state of the application
 *
 * @returns the available blockly programs
 */
export const getBlocklyPrograms = (state: RootState) =>
  state.blockly.blocklyPrograms;

/**
 * Retrieves the current active blockly program.
 *
 * @param state the root state of the app
 *
 * @returns the blockly program
 */
export const getCurrentBlocklyProgram = (state: RootState) =>
  getBlocklyProgram(state.blockly.activeBlocklyProgramId)(
    state
  ) as BlocklyProgram;

/**
 * Retrieves the program from the list of programs or returns nothing.
 *
 * @param title the title of the blockly program
 *
 * @returns the program or nothing
 */
export const getBlocklyProgram = (title: string) => (state: RootState) =>
  state.blockly.blocklyPrograms.find((p) => p.title === title);
