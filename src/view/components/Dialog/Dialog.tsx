import { KeyCodes } from "@fluentui/react";
import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { Button, ButtonBar, ButtonVariant } from "../Common/Button";
import { IconName } from "../Common/Icon";
import "./Dialog.css";

interface Action {
  label: string;
  onClick: () => boolean;
}

interface DialogContext {
  isOpen: boolean;
  heading: string | null;
  content: FunctionComponent;
  positiveAction: Action | null;
  negativeAction: Action | null;
}

const defaultDialogContext = {
  content: () => null,
  heading: null,
  isOpen: false,
  negativeAction: null,
  positiveAction: null,
};

const DialogContext = React.createContext<{
  dialogContext: DialogContext;
  setDialogContext: (newContext: DialogContext) => void;
}>({
  dialogContext: defaultDialogContext,
  setDialogContext: () => {},
});

const Dialog: FunctionComponent<{
  dialogContext: DialogContext;
  setDialogContext: (dialogContext: DialogContext) => void;
}> = ({ dialogContext, setDialogContext }) => {
  /** Closes the dialog and sets it back to the default state */
  const closeDialog = useCallback(
    () => setDialogContext(defaultDialogContext),
    [setDialogContext]
  );

  /**
   * Calls the positive action and returns the result, if present. If not present, returns true.
   */
  const callPositiveAction = useCallback(() => {
    return dialogContext.positiveAction?.onClick() ?? true;
  }, [dialogContext.positiveAction]);

  /**
   * Calls the negative action and returns the result, if present. If not present, returns true.
   */
  const callNegativeAction = useCallback(() => {
    return dialogContext.negativeAction?.onClick() ?? true;
  }, [dialogContext.negativeAction]);

  /** Handles keyboard events */
  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.keyCode === KeyCodes.escape) {
        // On escape, try the negative action if present. If it returns true, close. Does not close otherwise.
        if (callNegativeAction()) {
          closeDialog();
        }

        return;
      }

      if (e.keyCode === KeyCodes.enter) {
        if (callPositiveAction()) {
          closeDialog();
        }

        return;
      }
    },
    [callNegativeAction, callPositiveAction, closeDialog]
  );

  if (!dialogContext.isOpen) {
    return null;
  }

  const element = document.getElementById("root");
  if (!element) {
    return null;
  }

  const Content = dialogContext.content;

  return ReactDOM.createPortal(
    <div className="dialog dialog--overlay" onKeyUp={handleKeyUp}>
      <div className="dialog--container">
        {dialogContext.heading ? (
          <h2 className="dialog--container__heading">
            {dialogContext.heading}
          </h2>
        ) : null}
        <div className="dialog--container__content">
          <Content />
        </div>
        <div className="dialog--container__actions">
          <ButtonBar>
            {dialogContext.negativeAction ? (
              <Button
                variant={ButtonVariant.danger}
                iconName={IconName.exit}
                iconPosition="left"
                onClick={() => {
                  if (callNegativeAction()) {
                    closeDialog();
                  }
                }}
              >
                {dialogContext.negativeAction.label}
              </Button>
            ) : null}
            {dialogContext.positiveAction ? (
              <Button
                variant={ButtonVariant.success}
                iconName={IconName.save}
                iconPosition="left"
                onClick={() => {
                  if (callPositiveAction()) {
                    closeDialog();
                  }
                }}
              >
                {dialogContext.positiveAction.label}
              </Button>
            ) : null}
          </ButtonBar>
        </div>
      </div>
    </div>,
    element
  );
};

export const DialogProvider: FunctionComponent = ({ children }) => {
  const [dialogContext, setDialogContext] = useState<DialogContext>(
    defaultDialogContext
  );

  return (
    <DialogContext.Provider value={{ dialogContext, setDialogContext }}>
      <Dialog
        dialogContext={dialogContext}
        setDialogContext={setDialogContext}
      />
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const dialogContext = useContext(DialogContext);

  return {
    /**
     * Opens a new dialog. The dialog renders the content and if present the action buttons. If the onClick of
     * the action buttons returns true, the dialog will close. If not, it will stay open. The user may press esc or
     * enter to trigger the negative or positive actions respectively. If not present, they will close the dialog.
     *
     * There can only be 1 dialog open at any given time.
     */
    open: (dialog: Omit<DialogContext, "isOpen">) => {
      dialogContext.setDialogContext({ ...dialog, isOpen: true });
    },

    /**
     * Returns the current open state of the dialog.
     */
    isOpen: () => dialogContext.dialogContext.isOpen,

    /**
     * Closes the dialog.
     */
    close: () => {
      dialogContext.setDialogContext(defaultDialogContext);
    },
  };
};
