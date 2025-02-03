import { useEffect, useRef, useState } from "react";
import "../styles/ChatInput.css";
import useMessagesStore from "../stores/messagesStore";
import { Message } from "../types/messageStoreTypes";
import { VscFile } from "react-icons/vsc";
import getOs from "../utilities/getOs";
import { openai, combineInitMessages } from "../utilities/openai";

function ChatInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, addMessage } = useMessagesStore();
  const inputType = messages.length > 0 ? "Step" : "Definition";
  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const os = getOs();
    const isSendMessageShortcut =
      (os === "mac" && !e.metaKey && !e.shiftKey) || (os !== "mac" && !e.ctrlKey && !e.shiftKey);

    const isLogMessagesShortcut =
      (os === "mac" && e.metaKey && !e.shiftKey) || (os !== "mac" && e.ctrlKey && !e.shiftKey);

    if (e.key === "Enter") {
      if (isComposing) {
        return;
      }

      if (isSendMessageShortcut) {
        e.preventDefault();
        handleSendMessage();
      } else if (isLogMessagesShortcut) {
        e.preventDefault();
        openai.sendInitMessage(combineInitMessages(messages));
      }
    }
  };

  const handleSendMessage = () => {
    const input = inputRef.current;
    if (input !== null) {
      const message: Message = {
        type: inputType,
        content: input.innerText || "",
        editable: true,
      };
      addMessage(message);
      input.innerText = "";
    }
  };

  const definitionPlaceholderText = "Type your problem definition here...";
  const stepPlaceholderText = "Type your steps here...";

  return (
    <div className="chat-input-container">
      <ChatInputInfo />
      <div className="chat-input-wrapper">
        <div
          className="chat-input"
          ref={inputRef}
          contentEditable="true"
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          data-placeholder={inputType === "Definition" ? definitionPlaceholderText : stepPlaceholderText}></div>

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

function ChatInputInfo() {
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

  return (
    <div className="chat-input-info">
      <div className="input-document-indicator">
        <VscFile />
        {activatedDocument ? activatedDocument.split("/").pop() : "No file selected"}
      </div>
    </div>
  );
}
