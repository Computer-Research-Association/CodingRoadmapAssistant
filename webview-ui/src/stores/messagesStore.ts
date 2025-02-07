import { create } from "zustand";
import { MessagesState } from "../types/messageStoreTypes";

const useMessagesStore = create<MessagesState>((set) => ({
  timestamp: 0,
  messages: [],
  stepCount: 0,
  inputType: "Definition",
  addMessage: (newMessage) =>
    set((state) => {
      const isStep = state.messages.length > 0 && newMessage.type === "Step";
      return {
        messages: [...state.messages, newMessage],
        stepCount: isStep ? state.stepCount + 1 : state.stepCount,
      };
    }),
  clearMessages: () => set({ messages: [], stepCount: 0, inputType: "Definition" }),
  deleteMessage: (index: number) =>
    set((state) => {
      const newMessages = state.messages.filter((_, i) => i !== index);
      const newStepCount = newMessages.filter((msg) => msg.type === "Step").length;
      return { messages: newMessages, stepCount: newStepCount };
    }),
  updateMessage: (index: number, newContent: string) => {
    set((state) => ({
      messages: state.messages.map((msg, idx) => (idx === index ? { ...msg, content: newContent } : msg)),
    }));
  },
  loadMessages: (messages) =>
    set({
      messages,
      stepCount: messages.filter((msg) => msg.type === "Step").length,
    }),
  setTimestamp: (timestamp) => set({ timestamp }),
  updateMessagesEditableState: (newState) =>
    set((state) => ({
      messages: state.messages.map((msg) => ({
        ...msg,
        editable: newState,
      })),
    })),
}));

export default useMessagesStore;
