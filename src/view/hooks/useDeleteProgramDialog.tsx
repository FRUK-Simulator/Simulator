import React, { FunctionComponent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Program } from "../../BlocklyInterface/ProgramExportImport";
import { blocklySlice } from "../../BlocklyInterface/blocklySlice";
import { messageSlice, MessageType } from "../../state/messagesSlice";
import { ButtonVariant } from "../components/Common/Button";
import { IconName } from "../components/Common/Icon";
import { DialogVariant, useDialog } from "../components/Dialog/Dialog";

const DialogContent: FunctionComponent<{
  title: string;
}> = ({ title }) => {
  return (
    <div className="delete-program-dialog">
      Are you sure you want to delete "{title}"? This can't be undone!
    </div>
  );
};

/**
 * Returns a callback to open a dialog and save or create a new program.
 */
export const useDeleteProgramDialog = () => {
  const dispatch = useDispatch();
  const dialog = useDialog();

  const deleteProgram = useCallback(
    (program: Program) => {
      dialog.open({
        content: <DialogContent title={program.title} />,
        variant: DialogVariant.danger,
        heading: `Delete Program "${program.title}"?`,
        cancelAction: {
          label: "Cancel",
          onClick: () => {
            return true;
          },
        },
        acceptAction: {
          label: "Delete",
          iconName: IconName.exit,
          variant: ButtonVariant.danger,
          onClick: () => {
            if (program.predefined) {
              // technically, we should never get here - this is just a safe guard
              return true;
            }

            dispatch(
              blocklySlice.actions.removeBlocklyProgram({
                title: program.title,
              }),
            );

            dispatch(
              messageSlice.actions.addMessage({
                type: MessageType.success,
                msg: `${program.title} has been deleted!`,
              }),
            );

            return true;
          },
        },
      });
    },
    [dispatch, dialog],
  );

  return deleteProgram;
};
