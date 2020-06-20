import React, { FunctionComponent } from "react";
import { MessageBar } from "@fluentui/react";
import { useSelector, useDispatch } from "react-redux";
import { getMessages, messageSlice } from "./messagesSlice";
import "./MessageCenter.css";
import { AppDispatch } from "../store";

export const MessageCenter: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const messages = useSelector(getMessages);

  if (messages.length < 1) {
    return null;
  }

  return (
    <div className="message-center">
      {messages.map((error) => (
        <MessageBar
          messageBarType={error.type}
          key={error.id}
          onDismiss={() =>
            dispatch(messageSlice.actions.removeMessage({ id: error.id }))
          }
        >
          {error.msg}
        </MessageBar>
      ))}
    </div>
  );
};
