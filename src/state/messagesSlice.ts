import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { v4 as uuidv4 } from "uuid";

export enum MessageType {
  danger,
  success,
  info,
}

interface IMessageState {
  messages: Array<{
    id: string;
    type: MessageType;
    msg: string;
  }>;
}

export const messageSlice = createSlice({
  initialState: {
    messages: [],
  } as IMessageState,
  reducers: {
    addMessage(
      state,
      action: PayloadAction<{ type: MessageType; msg: string }>
    ) {
      state.messages = [
        { ...action.payload, id: uuidv4() },
        ...state.messages,
      ].slice(0, 5);

      return state;
    },
    removeMessage(state, action: PayloadAction<{ id: string }>) {
      state.messages = state.messages.filter(
        (msg) => msg.id !== action.payload.id
      );

      return state;
    },
  },
  name: "errors",
});

export const getMessages = (state: RootState) => state.messages.messages;
