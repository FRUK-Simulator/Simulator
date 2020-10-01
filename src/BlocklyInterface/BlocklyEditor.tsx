import React, { FunctionComponent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { vmSlice, isExecuting } from "../JavascriptVM/vmSlice";
import { AppDispatch } from "../state/store";
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
  getBlocklyXmlWorkspace,
} from "./blocklySlice";

import "./Blockly.css";
import Blockly, { WorkspaceSvg } from "blockly";
import { getDefaultToolbox, getEmptyToolbox } from "./toolbox";
import { loadBlocklyXml } from "../core/blockly/programs";

/**
 * Return the BlocklyInstance's current block tree as a
 * XML-formatted string.
 */
export function getCurrentBlocklyInstanceCode(): string {
  const xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
  const xml_text = Blockly.Xml.domToText(xml);
  return xml_text;
}

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

  const currentBlocklyCode = useSelector(getBlocklyXmlWorkspace);

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

      // Store the BlocklyInstance state in redux. Otherwise, when this
      // component gets unmounted we loose the current blocks.
      dispatch(
        blocklySlice.actions.setBlocklyXmlWorkspace({
          blocklyXmlWorkspace: getCurrentBlocklyInstanceCode(),
        })
      );
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
      // Create a new 'BlocklyInstance' and load it with the blocks that we
      // have stored in redux.
      blocklyRef.current = new BlocklyInstance(wrapperRef.current!, toolboxXml);
      Blockly.getMainWorkspace().clear();
      loadBlocklyXml(currentBlocklyCode, Blockly.getMainWorkspace());

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
  });

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

  useEffect(() => {
    // Has a different program been selected?
    if (getCurrentBlocklyInstanceCode() !== currentBlocklyCode) {
      Blockly.getMainWorkspace().clear();
      loadBlocklyXml(currentBlocklyCode, Blockly.getMainWorkspace());
    }
  }, [currentBlocklyCode, dispatch]);

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
  return (
    <div
      ref={wrapperRef}
      className={"blockly-workspace" + (executing ? " executing" : "")}
      title={
        executing ? "Your program cannot be changed until you stop it" : ""
      }
    ></div>
  );
};
