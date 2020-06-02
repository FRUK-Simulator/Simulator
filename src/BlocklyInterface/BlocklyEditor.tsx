import React, { FunctionComponent, useRef, useEffect, RefObject } from "react";
import { BlocklyInstance } from "./BlocklyInstance";
import "./Blockly.css";

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
    resizeBlocklyRegion();

    blocklyRef.current = new BlocklyInstance(
      workspaceAreaRef.current!,
      toolbox.current!
    );
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
    <div className="blockly-wrapper" ref={wrapperRef}>
      <div className="blockly-workspace-area" ref={workspaceAreaRef} />
    </div>
  );
};
