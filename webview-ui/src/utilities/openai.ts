import { Message } from "../types/messageStoreTypes";

export const combineMessages = (messages: Message[]): string => {
  return messages.map((message, i) => `${i === 0 ? "Definition" : i} ${message.content}`).join("\n");
};
