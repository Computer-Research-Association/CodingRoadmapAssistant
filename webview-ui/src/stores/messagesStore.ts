import { create } from "zustand";
import { MessagesState } from "../types/messageStoreTypes";

const useMessagesStore = create<MessagesState>((set) => ({
  messages: [],
  stepCount: 0,
  addMessage: (newMessage) =>
    set((state) => {
      const isStep = state.messages.length > 0 && newMessage.type === "step";
      return {
        messages: [...state.messages, newMessage],
        stepCount: isStep ? state.stepCount + 1 : state.stepCount,
      };
    }),
  clearMessages: () => set({ messages: [], stepCount: 0 }),
  deleteMessage: (index: number) =>
    set((state) => {
      const newMessages = state.messages.filter((_, i) => i !== index);
      const newStepCount = newMessages.filter((msg) => msg.type === "step").length;
      return { messages: newMessages, stepCount: newStepCount };
    }),
  updateMessage: (index: number, newContent: string) => {
    set((state) => ({
      messages: state.messages.map((msg, idx) => (idx === index ? { ...msg, content: newContent } : msg)),
    }));
  },
}));

export default useMessagesStore;
