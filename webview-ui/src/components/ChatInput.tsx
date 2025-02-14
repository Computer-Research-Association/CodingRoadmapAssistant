import { useEffect, useRef, useState } from "react";
import "../styles/ChatInput.css";
import useMessagesStore from "../stores/messagesStore";
import { Message } from "../types/messageStoreTypes";
import { VscFile } from "react-icons/vsc";
import getOs from "../utilities/getOs";
import { openai, combineMessages } from "../utilities/openai";
import { vscode } from "../utilities/vscode";
import { FaChevronCircleUp } from "react-icons/fa";

function ChatInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, addMessage, stepCount, timestamp, setTimestamp, updateMessagesEditableState } = useMessagesStore();
  const [inputType, setInputType] = useState(messages.length > 0 ? "Step" : "Definition");
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    if (messages.length === 0) {
      setInputType("Definition");
    } else {
      if (messages[messages.length - 1].type === "Additional" || messages[messages.length - 1].type === "Result") {
        setInputType("Additional");
      }
      if (messages[messages.length - 1].type === "Step") {
        setInputType("Step");
      }
    }
  }, [messages]);

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
        if (messages.length === 0) {
          setTimestamp(Date.now());
        }
        handleSendMessage();
      } else if (isLogMessagesShortcut) {
        e.preventDefault();
        updateMessagesEditableState(false);

        if (messages[messages.length - 1].type === "Step") {
          openai.sendInitMessage(combineMessages(messages, stepCount));
        } else {
          openai.sendAdditionalMessage(combineMessages(messages, stepCount));
        }
        window.postMessage({ command: "setLoading", data: true });
        setInputType("additional");
      }
    }
  };

  useEffect(() => {
    if (timestamp !== 0 && messages.length > 0) {
      vscode.postMessage({
        command: "saveMessageLog",
        data: {
          timestamp: timestamp,
          messages: messages,
        },
      });
    }
  }, [messages, timestamp]);

  const handleSendMessage = () => {
    const input = inputRef.current;
    if (input !== null && input.innerText.trim() !== "") {
      const message: Message = {
        type: inputType,
        content: input.innerText.trim(),
        editable: true,
      };
      addMessage(message);
      input.innerText = "";
      if (inputType === "Definition") {
        setInputType("Step");
      } else if (inputType.startsWith("Step")) {
        setInputType(`Step`);
      }
    }
  };

  const definitionPlaceholderText = "Type your problem definition here...";
  const stepPlaceholderText = "Type your steps here...";
  const additionalPlaceholderText = "Ask an additional question here...";

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
          data-placeholder={
            inputType === "Definition"
              ? definitionPlaceholderText
              : inputType.startsWith("Step")
                ? stepPlaceholderText
                : additionalPlaceholderText
          }></div>

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
  const [gotoDefStepTrigger, setGotoDefStepTrigger] = useState<boolean>(false);
  const gotoDefStepRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    gotoDefStepRef.current?.scrollIntoView({ behavior: "smooth" });
    setGotoDefStepTrigger(false);
  }, [gotoDefStepTrigger]);

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
      <div className="goto-defStep-btn" onClick={() => setGotoDefStepTrigger(true)}>
        <FaChevronCircleUp />
      </div>
    </div>
  );
}
