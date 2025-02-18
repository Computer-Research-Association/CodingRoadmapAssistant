import { vscode } from "./vscode";
import { Message } from "../types/messageStoreTypes";

export const combineMessages = (messages: Message[], stepCount: number): string => {
  console.log("messages: " + messages + `\n` + "stepCount: " + stepCount);
  return messages
    .map((message, i) => {
      let prefix = `${message.type}: `;
      if (message.type === "Step") prefix = `Step: ${i}`;
      return `${prefix}${message.content}`;
    })
    .join("\n");
};

export const openai = {
  sendInitMessage: (message: string) => {
    vscode.postMessage({
      command: "initialRequest",
      value: message,
    });
  },
  sendAdditionalMessage: (message: string) => {
    vscode.postMessage({
      command: "additional",
      value: message,
    });
  },
};
