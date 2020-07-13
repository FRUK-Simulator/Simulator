import React, { FunctionComponent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editorSlice, getActiveEditor, Editor } from "./editorSlice";
import { AppDispatch } from "../store";
import { BlocklyEditor } from "../BlocklyInterface/BlocklyEditor";
import { SourceView } from "./SourceView";
import { Toggle } from "@fluentui/react";

import "./EditorView.css";
import { blocklySlice } from "../BlocklyInterface/blocklySlice";

function getComponent(viewMode: Editor) {
  switch (viewMode) {
    case "Blockly":
      return <BlocklyEditor />;
    case "Source":
      return <SourceView />;
    default:
      assertNever(viewMode);
  }
}

function assertNever(x: never): never {
  throw new Error("Unexpected view mode: " + x);
}

/**
 * Container element for the program editor and its controls.
 */
export const EditorView: FunctionComponent = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const viewMode: Editor = useSelector(getActiveEditor);

  function onEditorViewModeToggled(
    ev: React.MouseEvent<HTMLElement>,
    checked: boolean | undefined
  ) {
    dispatch(
      editorSlice.actions.setActiveEditor({
        editor: checked ? "Blockly" : "Source",
      })
    );
  }

  function onToolboxToggled(_: any, checked: boolean | undefined) {
    dispatch(
      blocklySlice.actions.showToolbox({
        visible: checked || false,
      })
    );
  }

  return (
    <div ref={wrapperRef} className={"editor-view-workspace"} title={"Editor"}>
      <div className={"editor-panel"}>{getComponent(viewMode)}</div>
      <div className={"editor-view-controls"}>
        <Toggle
          label="Editor View"
          defaultChecked
          onText="Blockly"
          offText="Source"
          onChange={onEditorViewModeToggled}
        />
        <Toggle
          label="Toolbar"
          defaultChecked
          onText="Expand"
          offText="Collapse"
          onChange={onToolboxToggled}
        />
      </div>
    </div>
  );
};
