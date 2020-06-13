import { Events } from "blockly";
import React, { FunctionComponent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { vmSlice } from "../JavascriptVM/vmSlice";
import { AppDispatch } from "../store";
import { BlocklyEvent, BlocklyInstance } from "./BlocklyInstance";
import { getHighlightedBlockId } from "./blocklySlice";
import "./scripts/DcMotor.js";
import "./scripts/SensorTouch.js";

import "./Blockly.css";

/**
 * Component that wraps the blockly interface.
 */
export const BlocklyEditor: FunctionComponent = () => {
  const workspaceAreaRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const highlightedBlock = useSelector(getHighlightedBlockId);

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

      if (
        event instanceof Events.BlockMove ||
        event instanceof Events.BlockChange
      ) {
        dispatch(
          vmSlice.actions.setCode({ code: blocklyRef.current.getCode() })
        );
      }
    }

    resizeBlocklyRegion();

    if (!blocklyRef.current) {
      blocklyRef.current = new BlocklyInstance(workspaceAreaRef.current!);

      blocklyRef.current.addChangeListener(handleBlocklyChange);
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
    if (blocklyRef.current && highlightedBlock) {
      blocklyRef.current.highlightBlock(highlightedBlock);
    }
  }, [highlightedBlock]);

  return (
    <div ref={wrapperRef} className="blockly-workspace">
      <div className="blockly-workspace-area" ref={workspaceAreaRef} />
    </div>
  );
};
