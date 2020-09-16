import React, { useCallback } from "react";
import { Container } from "../components/Common/Container";
import { ButtonBar, Button, ButtonVariant } from "../components/Common/Button";
import { BlocklyEditor } from "../../BlocklyInterface/BlocklyEditor";
import { useSelector, useDispatch } from "react-redux";
import { isExecuting, getExecutionState } from "../../JavascriptVM/vmSlice";
import { ExecutionState } from "../../JavascriptVM/vm";
import { IconName } from "../components/Common/Icon";
import { useVM } from "../../JavascriptVM/JavascriptVM";
import { getActiveEditor, editorSlice } from "../../Editor/editorSlice";
import { SourceView } from "../../Editor/SourceView";
import { SaveProgramButton } from "../components/SaveProgramButton/SaveProgramButton";
import { ShowGamepadButton } from "../components/Gamepad/ShowGamepadButton";

const VMControls = () => {
  const isVMStarted = useSelector(isExecuting);
  const executionState = useSelector(getExecutionState);
  const vm = useVM();

  return (
    <ButtonBar>
      {isVMStarted ? (
        <Button
          iconName={IconName.exit}
          onClick={vm.stop}
          variant={ButtonVariant.danger}
        >
          Quit
        </Button>
      ) : (
        <Button
          iconName={IconName.start}
          onClick={vm.start}
          variant={ButtonVariant.success}
        >
          Start
        </Button>
      )}
      <Button
        disabled={!isVMStarted || executionState === ExecutionState.RUNNING}
        iconName={IconName.step}
        onClick={vm.step}
        variant={ButtonVariant.success}
      >
        Step
      </Button>
      {executionState === ExecutionState.RUNNING ? (
        <Button
          iconName={IconName.stop}
          onClick={vm.pause}
          variant={ButtonVariant.warning}
        >
          Pause
        </Button>
      ) : (
        <Button
          disabled={!isVMStarted}
          iconName={IconName.run}
          onClick={vm.run}
          variant={ButtonVariant.success}
        >
          Run
        </Button>
      )}
    </ButtonBar>
  );
};

const EditorControls = () => {
  const dispatch = useDispatch();
  const currentView = useSelector(getActiveEditor);

  const changeViewCallback = useCallback(() => {
    dispatch(
      editorSlice.actions.setActiveEditor({
        editor: currentView === "Blockly" ? "Source" : "Blockly",
      })
    );
  }, [currentView, dispatch]);

  return (
    <ButtonBar>
      <SaveProgramButton />
      <Button
        variant={ButtonVariant.info}
        iconName={IconName.view}
        onClick={changeViewCallback}
      >
        View {currentView === "Blockly" ? "Source" : "Blocks"}
      </Button>
      <ShowGamepadButton />
    </ButtonBar>
  );
};

export const BlocklyView = () => {
  const currentView = useSelector(getActiveEditor);

  return (
    <>
      <Container className="simulator-view--panel__main">
        {currentView === "Blockly" ? <BlocklyEditor /> : <SourceView />}
      </Container>
      <Container className="simulator-view--panel__utility">
        <VMControls />
        <EditorControls />
      </Container>
    </>
  );
};
