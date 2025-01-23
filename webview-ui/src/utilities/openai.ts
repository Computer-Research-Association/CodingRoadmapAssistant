import { vscode } from "./vscode";
import { Message } from "../types/messageStoreTypes";

export const combineMessages = (messages: Message[]): string => {
  return messages.map((message, i) => `${i === 0 ? "Definition" : i} ${message.content}`).join("\n");
};

export const openai = {
  sendMessage: (message: string) => {
    vscode.postMessage({
      command: "process",
      value: message,
    });
  },
};
