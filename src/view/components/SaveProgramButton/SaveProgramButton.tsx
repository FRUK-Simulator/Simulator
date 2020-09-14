import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentBlocklyCode } from "../../../BlocklyInterface/BlocklyEditor";
import {
  getCurrentBlocklyProgram,
  blocklySlice,
} from "../../../BlocklyInterface/blocklySlice";
import { Button, ButtonVariant } from "../Common/Button";
import { TextAreaFormField, TextFormField } from "../Common/Form";
import { IconName } from "../Common/Icon";
import { useDialog } from "../Dialog/Dialog";

const DialogContent = () => {
  return (
    <div>
      <TextFormField label="Program Name" />
      <TextAreaFormField label="Program Description" />
    </div>
  );
};

export const SaveProgramButton = () => {
  const dispatch = useDispatch();
  const currentProgram = useSelector(getCurrentBlocklyProgram);
  const dialog = useDialog();
  const saveProgram = useCallback(() => {
    dialog.open({
      content: DialogContent,
      heading: "Save Program",
      negativeAction: {
        label: "Cancel",
        onClick: () => {
          return true;
        },
      },
      positiveAction: {
        label: "Save",
        onClick: () => {
          dispatch(
            blocklySlice.actions.addBlockyProgram({
              prog: {
                ...currentProgram,
                xml: getCurrentBlocklyCode(),
              },
            })
          );

          return true;
        },
      },
    });
  }, [dispatch, currentProgram, dialog]);

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
