import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MessageType,
  getMessages,
  messageSlice,
} from "../../../state/messagesSlice";
import { AppDispatch } from "../../../state/store";
import { Icon, IconName } from "../Common/Icon";
import "./MessageCenter.css";

function errorTypeToClassName(errorType: MessageType) {
  switch (errorType) {
    case MessageType.danger:
      return "message--error";
    case MessageType.success:
      return "message--success";
    case MessageType.info:
      return "message--info";
  }
}

export const MessageCenter: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const messages = useSelector(getMessages);

  if (messages.length < 1) {
    return null;
  }

  return (
    <div className="message-center">
      {messages.map((message) => (
        <div
          className={`message ${errorTypeToClassName(message.type)}`}
          key={message.id}
        >
          <div className="message--content">{message.msg}</div>

          <div
            className="message--icon"
            onClick={() =>
              dispatch(messageSlice.actions.removeMessage({ id: message.id }))
            }
          >
            <Icon iconName={IconName.exit} />
          </div>
        </div>
      ))}
    </div>
  );
};
