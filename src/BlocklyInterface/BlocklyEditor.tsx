import { Events } from "blockly";
import React, { FunctionComponent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { vmSlice, isExecuting } from "../JavascriptVM/vmSlice";
import { AppDispatch } from "../store";
import {
  BlocklyEvent,
  BlocklyEventName,
  BlocklyInstance,
} from "./BlocklyInstance";
import {
  getHighlightedBlockId,
  getCurrentBlockSelection,
  blocklySlice,
} from "./blocklySlice";

import "./Blockly.css";

/**
 * Component that wraps the blockly interface.
 */
export const BlocklyEditor: FunctionComponent = () => {
  const workspaceAreaRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const highlightedBlock = useSelector(getHighlightedBlockId);
  const currentBlockSelection = useSelector(getCurrentBlockSelection);

  const executing = useSelector(isExecuting);

  const blocklyRef = useRef<BlocklyInstance | null>(null);

  function resizeBlocklyRegion() {
    // Compute the absolute coordinates and dimensions of wrapping area.
    if (!wrapperRef.current || !workspaceAreaRef.current) {
      return;
    }

    let element = wrapperRef.current;
    let x = 0;
    let y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent! as HTMLDivElement;
    } while (element);

    // Position blockly over wrapping area.
    const workspaceStyle = workspaceAreaRef.current.style;

    workspaceStyle.left = x + "px";
    workspaceStyle.top = y + "px";

    workspaceStyle.width = wrapperRef.current.offsetWidth + "px";
    workspaceStyle.height = wrapperRef.current.offsetHeight + "px";
  }

  // Initialize blockly and return destruction callback
  useEffect(() => {
    function handleBlocklyChange(event: BlocklyEvent) {
      if (!blocklyRef.current) {
        return;
      }

      dispatch(vmSlice.actions.setCode({ code: blocklyRef.current.getCode() }));
    }

    //function handleBlocklyUiEvent(event: Events.Ui) {
    function handleBlocklyUiEvent(event: any) {
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

    resizeBlocklyRegion();

    if (!blocklyRef.current) {
      blocklyRef.current = new BlocklyInstance(workspaceAreaRef.current!);

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

  return (
    <div
      ref={wrapperRef}
      className="blockly-workspace"
      style={{
        cursor: executing ? "not-allowed" : "auto",
      }}
    >
      <div
        className="blockly-workspace-area"
        ref={workspaceAreaRef}
        style={{
          pointerEvents: executing ? "none" : "auto",
        }}
      />
    </div>
  );
};
