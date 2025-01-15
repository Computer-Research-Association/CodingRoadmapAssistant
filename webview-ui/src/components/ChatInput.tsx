import { useRef, useState } from "react";
import "../styles/ChatInput.css";

function ChatInput() {
  // const [message, setMessage] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputHeight, setInputHeight] = useState("18px");

  const handleInputResize = () => {
    const input = inputRef.current;
    if (input !== null) {
      input.style.height = "18px";
      const height = input.scrollHeight + "px";
      setInputHeight(height);
    }
  };

  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        <div
          className="chat-input"
          ref={inputRef}
          contentEditable="true"
          onInput={handleInputResize}
          style={{ height: inputHeight }}
          data-placeholder="Type your message here..."></div>

        <button className="chat-input-button">
          <div className="tooltip">Send</div>
          <span className="icon">⏎</span>
          <div className="background"></div>
        </button>
      </div>
      <div className="chat-input-options">
        <div className="input-state-indicator">{"Definition"}</div>
      </div>
    </div>
  );
}

export default ChatInput;
