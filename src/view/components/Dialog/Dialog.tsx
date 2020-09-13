import React, { FunctionComponent, useContext, useState } from "react";
import ReactDOM from "react-dom";
import { Button, ButtonBar, ButtonVariant } from "../Common/Button";
import { Container } from "../Common/Container";
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
  if (!dialogContext.isOpen) {
    return null;
  }

  const element = document.getElementById("root");
  if (!element) {
    return null;
  }

  const Content = dialogContext.content;

  return ReactDOM.createPortal(
    <div className="dialog dialog--overlay">
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
                  const result = dialogContext.negativeAction?.onClick();

                  console.log(result);
                  if (result) {
                    setDialogContext(defaultDialogContext);
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
                  const result = dialogContext.positiveAction?.onClick();
                  console.log(result);
                  if (result) {
                    setDialogContext(defaultDialogContext);
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
    open: (dialog: Omit<DialogContext, "isOpen">) => {
      dialogContext.setDialogContext({ ...dialog, isOpen: true });
    },
    isOpen: () => dialogContext.dialogContext.isOpen,
    close: () => {
      dialogContext.setDialogContext(defaultDialogContext);
    },
  };
};
