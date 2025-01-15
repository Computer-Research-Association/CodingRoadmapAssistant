import { create } from "zustand";
import { MessagesState } from "../types/messageStoreTypes";

const useMessagesStore = create<MessagesState>((set) => ({
  messages: [],
  addMessage: (newMessage) => set((state) => ({ messages: [...state.messages, newMessage] })),
  clearMessages: () => set({ messages: [] }),
}));

export default useMessagesStore;
