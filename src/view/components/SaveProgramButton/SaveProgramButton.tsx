import React from "react";
import { useProgramDialog } from "../../hooks/useProgramDialog";
import { Button, ButtonVariant } from "../Common/Button";
import { IconName } from "../Common/Icon";

export const SaveProgramButton = () => {
  const saveProgram = useProgramDialog("save");

  return (
    <Button
      variant={ButtonVariant.info}
      iconName={IconName.save}
      onClick={saveProgram}
    >
      Save Program
    </Button>
  );
};
