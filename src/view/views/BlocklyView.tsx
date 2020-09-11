import React from "react";
import { Container } from "../components/Common/Container";
import { ButtonBar, Button, ButtonVariant } from "../components/Common/Button";
import { BlocklyEditor } from "../../BlocklyInterface/BlocklyEditor";
import { useSelector } from "react-redux";
import { isExecuting, getExecutionState } from "../../JavascriptVM/vmSlice";
import { ExecutionState } from "../../JavascriptVM/vm";
import { IconName } from "../components/Common/Icon";
import { useVM } from "../../JavascriptVM/JavascriptVM";

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

export const BlocklyView = () => {
  return (
    <>
      <Container className="simulator-view--panel__main">
        <BlocklyEditor />
      </Container>
      <Container className="simulator-view--panel__utility">
        <VMControls />
      </Container>
    </>
  );
};
