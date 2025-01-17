import { useRef } from "react";
import "../styles/ChatInput.css";
import useMessagesStore from "../stores/messagesStore";
import { Message } from "../types/messageStoreTypes";

function ChatInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  // const [inputHeight, setInputHeight] = useState("");
  const { messages, addMessage } = useMessagesStore();
  const inputType = messages.length > 0 ? "Step" : "Definition";

  const handleSendMessage = () => {
    const input = inputRef.current;
    if (input !== null) {
      const message: Message = {
        type: inputType,
        content: input.textContent || "",
      };
      addMessage(message);
      input.textContent = "";
    }
  };

  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        <div
          className="chat-input"
          ref={inputRef}
          contentEditable="true"
          data-placeholder="Type your message here..."></div>

        <button className="chat-input-button" onClick={handleSendMessage}>
          <div className="tooltip">Send</div>
          <span className="icon">⏎</span>
          <div className="background"></div>
        </button>
      </div>
      <div className="chat-input-options">
        <div className="input-state-indicator">{inputType}</div>
        <div id="chatWithCodebase">⌘ ⏎ Chat With Codebase</div>
      </div>
    </div>
  );
}

export default ChatInput;
