import { useEffect, useRef, useState } from "react";
import "../styles/ChatInput.css";
import useMessagesStore from "../stores/messagesStore";
import { Message } from "../types/messageStoreTypes";
import { VscFile } from "react-icons/vsc";

function ChatInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, addMessage } = useMessagesStore();
  const inputType = messages.length > 0 ? "Step" : "Definition";
  const [activatedDocument, setActivatedDocument] = useState<string>("");

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const { command, data } = e.data;
      if (command === "activateDocument") {
        setActivatedDocument(data);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleSendMessage = () => {
    const input = inputRef.current;
    if (input !== null) {
      const message: Message = {
        type: inputType,
        content: input.innerText || "",
      };
      addMessage(message);
      input.textContent = "";
    }
  };

  return (
    <div className="chat-input-container">
      <div className="chat-input-info">
        <div className="input-document-indicator">
          <VscFile />
          {activatedDocument ? activatedDocument.split("/").pop() : "No file selected"}
        </div>
      </div>
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
        <div id="chatWithCodebase">{navigator.userAgent.toUpperCase().includes("MAC") ? "⌘" : "Ctrl"} ⏎ Run</div>
      </div>
    </div>
  );
}

export default ChatInput;
