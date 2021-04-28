import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { Button, ButtonBar, ButtonVariant } from "../Common/Button";
import { IconName } from "../Common/Icon";
import "./Dialog.css";

export enum DialogVariant {
  info = "dialog--info",
  danger = "dialog--danger",
}

interface Action {
  label: string;
  iconName?: IconName;
  variant?: ButtonVariant;
  onClick: () => boolean;
}

interface IDialogContext {
  isOpen: boolean;
  heading: string | null;
  content: ReactNode;
  variant?: DialogVariant;
  cancelAction: Action | null;
  acceptAction: Action | null;
}

const defaultDialogContext = {
  content: null,
  heading: null,
  isOpen: false,
  cancelAction: null,
  acceptAction: null,
};

const DialogContext = React.createContext<{
  dialogContext: IDialogContext;
  setDialogContext: (newContext: IDialogContext) => void;
}>({
  dialogContext: defaultDialogContext,
  setDialogContext: () => {},
});

const Dialog: FunctionComponent<{
  dialogContext: IDialogContext;
  setDialogContext: (dialogContext: IDialogContext) => void;
}> = ({ dialogContext, setDialogContext }) => {
  /** Closes the dialog and sets it back to the default state */
  const closeDialog = useCallback(
    () => setDialogContext(defaultDialogContext),
    [setDialogContext]
  );

  /**
   * Calls the positive action and returns the result, if present. If not present, returns true.
   */
  const callAcceptAction = useCallback(() => {
    return dialogContext.acceptAction?.onClick() ?? true;
  }, [dialogContext.acceptAction]);

  /**
   * Calls the negative action and returns the result, if present. If not present, returns true.
   */
  const callCancelAction = useCallback(() => {
    return dialogContext.cancelAction?.onClick() ?? true;
  }, [dialogContext.cancelAction]);

  /** Handles keyboard events */
  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // On escape, try the negative action if present. If it returns true, close. Does not close otherwise.
        if (callCancelAction()) {
          closeDialog();
        }

        return;
      }
    };

    window.addEventListener("keyup", keyListener);

    return () => window.removeEventListener("keyup", keyListener);
  }, [callCancelAction, closeDialog]);

  /** Close on overlay click */
  const handleOverlayClick = useCallback(() => {
    if (callCancelAction()) {
      closeDialog();
    }
  }, [callCancelAction, closeDialog]);

  if (!dialogContext.isOpen) {
    return null;
  }

  const element = document.getElementById("root");
  if (!element) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="dialog dialog--overlay" onClick={handleOverlayClick}>
      <div
        className={`dialog--container ${
          dialogContext.variant ?? DialogVariant.info
        }`}
        onClick={(e) => {
          // prevent click event from going to parent
          e.stopPropagation();
        }}
      >
        {dialogContext.heading ? (
          <h2 className="dialog--container__heading">
            {dialogContext.heading}
          </h2>
        ) : null}
        <div className="dialog--container__content">
          {dialogContext.content}
        </div>
        <div className="dialog--container__actions">
          <ButtonBar>
            {dialogContext.cancelAction ? (
              <Button
                variant={dialogContext.cancelAction.variant}
                iconName={dialogContext.cancelAction.iconName}
                iconPosition="left"
                onClick={() => {
                  if (callCancelAction()) {
                    closeDialog();
                  }
                }}
              >
                {dialogContext.cancelAction.label}
              </Button>
            ) : null}
            {dialogContext.acceptAction ? (
              <Button
                variant={dialogContext.acceptAction.variant}
                iconName={dialogContext.acceptAction.iconName}
                iconPosition="left"
                onClick={() => {
                  if (callAcceptAction()) {
                    closeDialog();
                  }
                }}
              >
                {dialogContext.acceptAction.label}
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
  const [dialogContext, setDialogContext] = useState<IDialogContext>(
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
    open: (dialog: Omit<IDialogContext, "isOpen">) => {
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
