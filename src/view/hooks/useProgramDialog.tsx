/**
 * Legacy hook to remove.
 * Use kebab-case for new hook file names.
 */
import { FunctionComponent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Program } from "../../BlocklyInterface/ProgramExportImport";
import {
  getCurrentBlocklyProgram,
  blocklySlice,
  getBlocklyPrograms,
} from "../../BlocklyInterface/blocklySlice";
import { createNewProgram } from "../../core/blockly/programs";
import { messageSlice, MessageType } from "../../state/messagesSlice";
import { ButtonVariant } from "../components/Common/Button";
import { TextFormField, TextAreaFormField } from "../components/Common/Form";
import { IconName } from "../components/Common/Icon";
import { useDialog } from "../components/Dialog/Dialog";
import { getCurrentBlocklyInstanceCode } from "../../BlocklyInterface/BlocklyInstance";

// eslint-disable-next-line react-refresh/only-export-components
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

/**
 * Returns a callback to open a dialog and save or create a new program.
 */
export const useProgramDialog = (type: "create" | "save") => {
  const dispatch = useDispatch();
  const allPrograms = useSelector(getBlocklyPrograms);
  const currentProgram = useSelector(getCurrentBlocklyProgram);
  const dialog = useDialog();
  const program: Program =
    type === "save" ? currentProgram : createNewProgram();

  const saveProgram = useCallback(() => {
    dialog.open({
      content: (
        <DialogContent
          title={program.title}
          description={program.description ?? ""}
        />
      ),
      heading: "Save Program",
      cancelAction: {
        label: "Cancel",
        variant: ButtonVariant.danger,
        iconName: IconName.exit,
        onClick: () => {
          return true;
        },
      },
      acceptAction: {
        label: "Save",
        iconName: IconName.save,
        variant: ButtonVariant.success,
        onClick: () => {
          const programName =
            (document.getElementById("blockly-program-id") as HTMLInputElement)
              ?.value ?? "";

          const programDescription =
            (
              document.getElementById(
                "blockly-program-description",
              ) as HTMLInputElement
            )?.value ?? "";

          // TODO: Check if the title / description before saving
          if (!programName) {
            dispatch(
              messageSlice.actions.addMessage({
                type: MessageType.danger,
                msg: "Program Name cannot be blank",
              }),
            );

            return false;
          }

          if (programName === program.title && currentProgram.predefined) {
            dispatch(
              messageSlice.actions.addMessage({
                type: MessageType.danger,
                msg: "You cannot save over a sample program. Please choose a new name.",
              }),
            );

            return false;
          }

          if (
            type === "create" &&
            allPrograms.some((p) => p.title === programName)
          ) {
            dispatch(
              messageSlice.actions.addMessage({
                type: MessageType.danger,
                msg: `"${programName}" already exists. Please choose a new name.`,
              }),
            );

            return false;
          }

          dispatch(
            blocklySlice.actions.addBlocklyProgram({
              prog: {
                ...program,
                predefined: false,
                title: programName,
                description: programDescription,
                xml:
                  type === "save"
                    ? getCurrentBlocklyInstanceCode()
                    : program.xml,
              },
            }),
          );

          dispatch(
            messageSlice.actions.addMessage({
              type: MessageType.success,
              msg: `${programName} has been saved!`,
            }),
          );

          return true;
        },
      },
    });
  }, [dispatch, currentProgram, dialog, allPrograms, program, type]);

  return saveProgram;
};
