import React from "react";
import { useLocation } from "react-router-dom";
import { useProgramDialog } from "../../hooks/useProgramDialog";
import { Button, ButtonVariant } from "../Common/Button";
import { IconName } from "../Common/Icon";

export const SaveProgramButton = () => {
  const saveProgram = useProgramDialog("save");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  return (
    <Button
      variant={ButtonVariant.info}
      iconName={IconName.save}
      onClick={saveProgram}
      disabled={queryParams.get("view") === "robot"}
    >
      Save Program
    </Button>
  );
};
