import React, { FunctionComponent, useRef } from "react";
import "./Blockly.css";

/**
 * Component that wraps the blockly interface.
 */
export const Blockly: FunctionComponent = () => {
  const blocklyRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className="blockly-ui">
      <div ref={blocklyRef} />
    </div>
  );
};
