import React, { FunctionComponent, useCallback } from "react";
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

const DialogContent: FunctionComponent<{
  title: string;
  description: string;
}> = ({ title, description }) => {
  return (
    <div>
      <TextFormField
        label="Program Name"
        inputProps={{ id: "blockly-program-id", defaultValue: title }}
      />
      <TextAreaFormField
        label="Program Description"
        inputProps={{
          id: "blockly-program-description",
          defaultValue: description,
        }}
      />
    </div>
  );
};

export const SaveProgramButton = () => {
  const dispatch = useDispatch();
  const currentProgram = useSelector(getCurrentBlocklyProgram);
  const dialog = useDialog();
  const saveProgram = useCallback(() => {
    dialog.open({
      content: (
        <DialogContent
          title={currentProgram.title}
          description={currentProgram.description}
        />
      ),
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
          const programName =
            (document.getElementById("blockly-program-id") as HTMLInputElement)
              ?.value ?? "";

          const programDescription =
            (document.getElementById(
              "blockly-program-description"
            ) as HTMLInputElement)?.value ?? "";

          dispatch(
            blocklySlice.actions.addBlockyProgram({
              prog: {
                ...currentProgram,
                title: programName,
                description: programDescription,
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
