export interface Message {
  type: string;
  content: string;
}

export interface MessagesState {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  deleteMessage: (index: number) => void;
}
