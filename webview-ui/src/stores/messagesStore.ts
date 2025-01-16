import { create } from "zustand";
import { MessagesState } from "../types/messageStoreTypes";

const useMessagesStore = create<MessagesState>((set) => ({
  messages: [],
  addMessage: (newMessage) => set((state) => ({ messages: [...state.messages, newMessage] })),
  clearMessages: () => set({ messages: [] }),
  deleteMessage: (index: number) => set((state) => ({ messages: state.messages.filter((_, i) => i !== index) })),
  updateMessage: (index: number, newContent: string) => {
    set((state) => ({
      messages: state.messages.map((msg, idx) => (idx === index ? { ...msg, content: newContent } : msg)),
    }));
  },
}));

export default useMessagesStore;
