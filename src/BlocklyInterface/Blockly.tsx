import React, { FunctionComponent, createRef, RefObject } from "react";
import { Toolbox } from "./Toolbox";
import { BlocklyEditor } from "./BlocklyEditor";
import "./Blockly.css";

/**
 * Component that wraps the blockly structure together, including toolbox.
 */
export const Blockly: FunctionComponent = () => {
  const toolbox: RefObject<HTMLElement> = createRef();

  return (
    <div className="blockly-wrapper">
      <Toolbox ref={toolbox} />
      <BlocklyEditor toolbox={toolbox} />
    </div>
  );
};
