import { vscode } from "./vscode";
import { Message } from "../types/messageStoreTypes";

export const combineInitMessages = (messages: Message[]): string => {
  return messages.map((message, i) => `${i === 0 ? "Definition" : i} ${message.content}`).join("\n");
};

export const openai = {
  sendInitMessage: (message: string) => {
    vscode.postMessage({
      command: "initialRequest",
      value: message,
    });
  },
  sendAdditionalMessage: (message: string, option: number) => {
    vscode.postMessage({
      command: "button",
      value: message,
      number: option,
    });
  },
};
