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
import { useLocation } from "react-router-dom";
import {
  getBlocklyXmlWorkspace,
  getMaxBlocksConfig,
} from "../../BlocklyInterface/blocklySlice";
import Blockly from "blockly";
import { useState } from "react";
import { FunctionComponent } from "react";

export const VMControls = () => {
  const isVMStarted = useSelector(isExecuting);
  const executionState = useSelector(getExecutionState);
  const vm = useVM();

  return (
    <ButtonBar>
      {isVMStarted ? (
        <Button
          iconName={IconName.exit}
          onClick={vm.reset}
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
          Load
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
          iconName={IconName.pause}
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

export const EditorControls = () => {
  const dispatch = useDispatch();
  const currentView = useSelector(getActiveEditor);

  const changeViewCallback = useCallback(() => {
    dispatch(
      editorSlice.actions.setActiveEditor({
        editor: currentView === "Blockly" ? "Source" : "Blockly",
      }),
    );
  }, [currentView, dispatch]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  return (
    <ButtonBar>
      <SaveProgramButton />
      <Button
        variant={ButtonVariant.info}
        iconName={IconName.view}
        onClick={changeViewCallback}
        disabled={queryParams.get("view") === "robot"}
      >
        View {currentView === "Blockly" ? "Source" : "Blocks"}
      </Button>
      <ShowGamepadButton />
    </ButtonBar>
  );
};

interface BlocksCountComponentProps {
  isBlocklyInitialized: boolean;
}

const BlocksCountComponent: FunctionComponent<BlocksCountComponentProps> = ({
  isBlocklyInitialized,
}) => {
  const maxBlocksConfig = useSelector(getMaxBlocksConfig);

  // We read the blockly xml workspace to get update when
  // blockly xml is modified in the redux store.
  const currentBlocklyCode = useSelector(getBlocklyXmlWorkspace);
  const mainWorkspace = Blockly.getMainWorkspace();

  if (
    !isBlocklyInitialized ||
    !maxBlocksConfig ||
    !mainWorkspace ||
    !currentBlocklyCode
  ) {
    return null;
  }

  const blocksCount = mainWorkspace.getAllBlocks(false).length;

  let maxBlocksMessage = "";
  if (maxBlocksConfig.isHardLimit) {
    // hard limit
    if (blocksCount >= maxBlocksConfig.maxBlocks) {
      maxBlocksMessage = `You used all the ${maxBlocksConfig.maxBlocks} blocks in your program and cannot add anymore.`;
    } else {
      maxBlocksMessage = `You are using ${blocksCount} out of ${maxBlocksConfig.maxBlocks} allowed blocks to solve this challange`;
    }
  } else {
    // soft limit
    if (blocksCount === maxBlocksConfig.maxBlocks) {
      maxBlocksMessage = `You used all the ${maxBlocksConfig.maxBlocks} blocks that should solve this challange.`;
    } else if (blocksCount > maxBlocksConfig.maxBlocks) {
      maxBlocksMessage = `You used more than the ${maxBlocksConfig.maxBlocks} blocks that should solve this challange. try to remove some of them.`;
    } else {
      maxBlocksMessage = `You are using ${blocksCount} out of ${maxBlocksConfig.maxBlocks} blocks to solve this challange`;
    }
  }

  return <h4>{maxBlocksMessage}</h4>;
};

export const BlocklyView = () => {
  const currentView = useSelector(getActiveEditor);
  const [isBlocklyInitialized, setIsBlocklyInitialized] = useState(false);

  // BlocklyEditor is the component that is initializing the Blockly workspace.
  // We have the initialized callback to make sure the BlocklyView (this component)
  // is update after initialization.
  // This is important for the first time Blockly is initialized.

  return (
    <>
      <BlocksCountComponent isBlocklyInitialized={isBlocklyInitialized} />
      <Container className="simulator-view--panel__main">
        {currentView === "Blockly" ? (
          <BlocklyEditor
            blocklyInitializedCallback={() => setIsBlocklyInitialized(true)}
          />
        ) : (
          <SourceView />
        )}
      </Container>
      <Container className="simulator-view--panel__utility">
        <VMControls />
        <EditorControls />
      </Container>
    </>
  );
};
