import { Events } from "blockly";
import React, { FunctionComponent, RefObject, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { vmSlice } from "../JavascriptVM/vmSlice";
import { AppDispatch } from "../store";
import { BlocklyEvent, BlocklyInstance } from "./BlocklyInstance";

/**
 * Component that wraps the blockly interface.
 */

interface BlocklyEditorProps {
  toolbox: RefObject<HTMLElement>;
}

export const BlocklyEditor: FunctionComponent<BlocklyEditorProps> = ({
  toolbox,
}) => {
  const workspaceAreaRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const blocklyRef = useRef<BlocklyInstance | null>(null);

  function handleBlocklyChange(event: BlocklyEvent) {
    if (!blocklyRef.current) {
      return;
    }

    console.log(event);

    if (event instanceof Events.BlockMove) {
      dispatch(vmSlice.actions.setCode({ code: blocklyRef.current.getCode() }));
    }
  }

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
    resizeBlocklyRegion();

    blocklyRef.current = new BlocklyInstance(
      workspaceAreaRef.current!,
      toolbox.current!
    );

    blocklyRef.current.addChangeListener(handleBlocklyChange);
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

  return (
    <div ref={wrapperRef} className="blockly-workspace">
      <div className="blockly-workspace-area" ref={workspaceAreaRef} />
    </div>
  );
};
