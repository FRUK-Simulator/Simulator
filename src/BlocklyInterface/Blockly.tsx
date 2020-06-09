import React, { FunctionComponent } from "react";
import { BlocklyEditor } from "./BlocklyEditor";
import "./Blockly.css";

/**
 * Component that wraps the blockly structure together, including toolbox.
 */
export const Blockly: FunctionComponent = () => {
  return (
    <div className="blockly-wrapper">
      <BlocklyEditor />
    </div>
  );
};
