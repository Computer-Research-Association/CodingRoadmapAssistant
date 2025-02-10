export interface Message {
  type: string;
  content: string;
  editable: boolean;
}

export interface MessagesState {
  timestamp: number;
  messages: Message[];
  stepCount: number;
  inputType: string;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  deleteMessage: (index: number) => void;
  updateMessage: (index: number, newMessage: string) => void;
  loadMessages: (messages: Message[]) => void;
  setTimestamp: (timestamp: number) => void;
  updateMessagesEditableState: (newState: boolean) => void;
}
