import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { DefaultButton, Dropdown, ISelectableOption } from "@fluentui/react";
import { useDispatch, useSelector } from "react-redux";
import { vmSlice, isExecuting } from "../JavascriptVM/vmSlice";
import { messageSlice } from "../ErrorViews/messagesSlice";
import { MessageBarType } from "@fluentui/react";
import { AppDispatch } from "../store";
import {
  TextField,
  ITextFieldStyles,
} from "office-ui-fabric-react/lib/TextField";
import {
  BlocklyEvent,
  BlocklyUiEvent,
  BlocklyEventName,
  BlocklyInstance,
} from "./BlocklyInstance";
import {
  getHighlightedBlockId,
  getCurrentBlockSelection,
  isShowToolbox,
  getToolboxXml,
  blocklySlice,
} from "./blocklySlice";

import "./Blockly.css";
import {
  BlocklyProgram,
  predefinedDemos,
  BlocklyProgramMap,
  getAllPredefinedProgs,
  loadBlocklyXml,
  BlocklyDemoProgram,
  getUserDefinedProgs,
  storeUserDefinedProgs,
} from "./BlocklyProgramLoader";
import Blockly, { WorkspaceSvg, Workspace } from "blockly";
import { getDefaultToolbox, getEmptyToolbox } from "./toolbox";

/**
 * Component that wraps the blockly interface.
 */
export const BlocklyEditor: FunctionComponent = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const highlightedBlock = useSelector(getHighlightedBlockId);
  const currentBlockSelection = useSelector(getCurrentBlockSelection);
  const showToolbox = useSelector(isShowToolbox);
  const toolboxXml = useSelector(getToolboxXml);

  const executing = useSelector(isExecuting);

  const blocklyRef = useRef<BlocklyInstance | null>(null);

  // Keep track of all blockly programs (pre-defined and user-defined)
  const [blockly_programs, set_blockly_programs] = useState<BlocklyProgramMap>(
    getAllPredefinedProgs()
  );

  // State + handler for blockly program save window
  const [
    saveBlocklyProgramInputForm,
    setSaveBlocklyProgramInputForm,
  ] = React.useState("");
  const onChangesaveBlocklyProgramInputForm = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    setSaveBlocklyProgramInputForm(newValue || "");
  };

  // state that keeps track of the currently loaded prog
  const [active_prog_id, set_active_prog_id] = useState<string>(
    predefinedDemos[0].title
  );

  // State and onClick handler for dropdown menu
  const [selectedProgramItem, setselectedProgramItem] = React.useState<
    ISelectableOption
  >();
  const onProgramChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: ISelectableOption | undefined,
    index?: number | undefined
  ): void => {
    if (option && option.title) {
      setselectedProgramItem(option);
      if (option.title) {
        set_active_prog_id(option.title);
      }
    }
  };

  // Populate list view items
  interface BlocklyProgramListItem {
    key: string;
    text: string;
    title: string;
    data: { predefined: boolean };
  }
  let program_dropdown_items: BlocklyProgramListItem[] = [];
  blockly_programs.forEach(function (value: BlocklyProgram, key: string) {
    program_dropdown_items.push({
      key: value.title,
      text: value.title,
      title: value.title,
      data: { predefined: value.predefined },
    });
  });

  function resizeBlocklyRegion() {
    // Compute the absolute coordinates and dimensions of wrapping area.
    if (!wrapperRef.current || !wrapperRef.current.parentElement) {
      return;
    }

    // Position blockly over wrapping area.
    const workspaceStyle = wrapperRef.current.style;

    workspaceStyle.width = wrapperRef.current.parentElement.clientWidth + "px";
    workspaceStyle.height =
      wrapperRef.current.parentElement.clientHeight + "px";
  }

  // Initialize blockly and return destruction callback
  useEffect(() => {
    function handleBlocklyChange(event: BlocklyEvent) {
      if (!blocklyRef.current) {
        return;
      }

      dispatch(vmSlice.actions.setCode({ code: blocklyRef.current.getCode() }));
    }

    function handleBlocklyUiEvent(event: BlocklyEvent) {
      if (event instanceof BlocklyUiEvent) {
        if (!blocklyRef.current) {
          return;
        }

        if (event.element === "selected") {
          dispatch(
            blocklySlice.actions.selectedBlock({
              blockId: blocklyRef.current.selected || "",
            })
          );
        }
      }
    }

    resizeBlocklyRegion();

    if (!blocklyRef.current) {
      blocklyRef.current = new BlocklyInstance(wrapperRef.current!, toolboxXml);

      if (blockly_programs.has(active_prog_id)) {
        loadBlocklyXml(
          blockly_programs.get(active_prog_id)!.xml,
          Blockly.getMainWorkspace()
        );
      } else {
        loadBlocklyXml(
          blockly_programs.get(predefinedDemos[0].title)!.xml,
          Blockly.getMainWorkspace()
        );
      }

      // Retrieve all user-defined programs
      let persistedProgs: BlocklyProgramMap = getUserDefinedProgs();
      // And merge them with the pre-defined programs
      set_blockly_programs(
        new Map([
          ...Array.from(blockly_programs.entries()),
          ...Array.from(persistedProgs.entries()),
        ])
      );

      blocklyRef.current.addChangeListener(
        BlocklyEventName.BlockMove,
        handleBlocklyChange
      );
      blocklyRef.current.addChangeListener(
        BlocklyEventName.BlockChange,
        handleBlocklyChange
      );

      blocklyRef.current.addChangeListener(
        BlocklyEventName.Ui,
        handleBlocklyUiEvent
      );
    }
  }, [active_prog_id, dispatch, blockly_programs, toolboxXml]);

  // Clear + re-build Blockly workspace
  useEffect(() => {
    Blockly.getMainWorkspace().clear();
    if (blockly_programs.has(active_prog_id)) {
      loadBlocklyXml(
        blockly_programs.get(active_prog_id)!.xml,
        Blockly.getMainWorkspace()
      );
    }
  }, [active_prog_id, blockly_programs]);

  // Listen on window resizes and redraw blockly
  useEffect(() => {
    function onResizeHandler() {
      resizeBlocklyRegion();

      blocklyRef.current?.resizeBlockly();
    }

    window.addEventListener("resize", onResizeHandler);

    return window.removeEventListener.bind(window, "resize", onResizeHandler);
  });

  useEffect(() => {
    if (blocklyRef.current) {
      if (highlightedBlock) {
        blocklyRef.current.highlightBlock(highlightedBlock);
      }

      blocklyRef.current.selected = currentBlockSelection;
    }
  }, [highlightedBlock, currentBlockSelection, executing]);

  // show/minimize the toolbox. Blockly does not allow the manipulation of the toolbox
  // in any way except updating the xml definition of it.
  useEffect(() => {
    if (blocklyRef.current) {
      dispatch(
        blocklySlice.actions.setToolboxXml({
          toolboxXml: showToolbox ? toolboxXml : getEmptyToolbox(),
        })
      );
    }
  }, [showToolbox, dispatch, toolboxXml]);

  // update the toolbox UI based on the toolboxXml definition in the slice
  useEffect(() => {
    if (blocklyRef.current) {
      const workspace = Blockly.getMainWorkspace() as WorkspaceSvg;
      // close any blockly popup/flyout when we're switching the toolbox
      Blockly.hideChaff(false);
      // get new xml definition for toolbox
      const blocklyXml = showToolbox ? getDefaultToolbox() : getEmptyToolbox();
      workspace.updateToolbox(blocklyXml);
      // extra call to refresh the workspace. Otherwise the workspace will not be
      // refreshed based on the new width of the toolbox
      workspace.resize();
    }
  }, [toolboxXml, showToolbox]);

  const save_current_blockly_program = (prog_name: string) => {
    // Obtain current blockly code as an XML-formatted string
    const xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
    const xml_text = Blockly.Xml.domToText(xml);

    // Update the map of blockly programs
    let updated_blockly_programs: BlocklyProgramMap = new Map(blockly_programs);

    updated_blockly_programs.set(prog_name, {
      title: prog_name,
      xml: xml_text,
      predefined: false,
    });
    set_blockly_programs(updated_blockly_programs);
    set_active_prog_id(prog_name);

    // Notify users that saving the program was successful
    dispatch(
      messageSlice.actions.addMessage({
        type: MessageBarType.success,
        msg: "Program saved!",
      })
    );

    storeUserDefinedProgs(updated_blockly_programs);
  };

  const textFieldStyles: Partial<ITextFieldStyles> = {
    fieldGroup: { width: 300 },
  };
  function delete_blockly_program(prog_name: string): void {
    // Update the map of blockly programs
    let updated_blockly_programs: BlocklyProgramMap = new Map(blockly_programs);
    updated_blockly_programs.delete(prog_name);
    set_blockly_programs(updated_blockly_programs);
    if (prog_name === active_prog_id) {
      set_active_prog_id("");
    }

    storeUserDefinedProgs(updated_blockly_programs);
  }
  const onRenderOption = (option?: ISelectableOption): JSX.Element => {
    const program_title: string = option && option.text ? option.text : "";
    const program_color: string =
      option && option.data.predefined ? "#f5f5f5" : "#955fc7";
    let delete_button;
    if (option && option.data.predefined == false) {
      delete_button = (
        <DefaultButton
          onClick={(e) => {
            delete_blockly_program(program_title);
            e.stopPropagation();
          }}
          allowDisabledFocus
          disabled={false}
          iconProps={{ iconName: "Delete" }}
          style={{
            alignContent: "right",
            padding: "10px",
            backgroundColor: program_color,
          }}
        />
      );
    }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          backgroundColor: program_color,
        }}
      >
        <span
          style={{
            alignContent: "left",
            padding: "10px",
            width: "100%",
            backgroundColor: program_color,
          }}
        >
          {program_title}
        </span>
        {delete_button}
      </div>
    );
  };

  return (
    <div
      ref={wrapperRef}
      className={"blockly-workspace" + (executing ? " executing" : "")}
      title={
        executing ? "Your program cannot be changed until you stop it" : ""
      }
    >
      <div className="item">
        <TextField
          label="Save current Blockly program as:"
          placeholder="Enter a unique program name and hit 'Enter'"
          value={saveBlocklyProgramInputForm}
          onChange={onChangesaveBlocklyProgramInputForm}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              save_current_blockly_program(saveBlocklyProgramInputForm);
              setSaveBlocklyProgramInputForm("");
            }
          }}
          styles={textFieldStyles}
        />
        <Dropdown
          label="Select Blockly program"
          selectedKey={
            selectedProgramItem ? selectedProgramItem.key : undefined
          }
          onChange={onProgramChange}
          placeholder="Select an option"
          options={program_dropdown_items}
          onRenderOption={onRenderOption}
          styles={{ dropdown: { width: 300 } }}
        />
      </div>
    </div>
  );
};
