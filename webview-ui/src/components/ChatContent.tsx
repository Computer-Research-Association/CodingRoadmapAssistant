import useMessagesStore from "../stores/messagesStore";
import "../styles/ChatContent.css";
import { VscTrash } from "react-icons/vsc";
import React, { useEffect, useRef, useState } from "react";
import { Message } from "../types/messageStoreTypes";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ChatContent() {
  const { messages, updateMessage, addMessage } = useMessagesStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleGetGPTResponse = (e: MessageEvent) => {
      const { command, data } = e.data;
      if (command === "setGptResponse") {
        const gptResponseMessage: Message = {
          type: "result",
          content: data,
          editable: false,
        };
        addMessage(gptResponseMessage);
        setLoading(false);
      } else if (command === "setLoading") {
        setLoading(data);
      }
    };

    window.addEventListener("message", handleGetGPTResponse);
    return () => {
      window.removeEventListener("message", handleGetGPTResponse);
    };
  }, [addMessage]);

  const handleBlur = (e: React.ChangeEvent<HTMLDivElement>, index: number) => {
    updateMessage(index, e.target.innerText);
  };

  const messageEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" }); // 자신이 호출된 요소가 사용자에게 표시되도록 상위 컨테이너를 스크롤
  }, [messages]);

  return (
    <main id="chat-container">
      {messages && messages.length > 0 ? (
        <div className="messages-container flex" onClick={(e) => e.stopPropagation()}>
          {messages.map((message, index) => (
            <MessageBox key={message.type + index} message={message} index={index} handleBlur={handleBlur} />
          ))}
        </div>
      ) : (
        <div className="learnCRA">LEARN CRA!!!</div>
      )}
      {loading ? (
        <div className="loading">
          <AiOutlineLoading3Quarters />
        </div>
      ) : null}
      <div ref={messageEndRef}></div>
    </main>
  );
}

function MessageBox({
  handleBlur,
  index,
  message,
}: {
  handleBlur: (e: React.ChangeEvent<HTMLDivElement>, index: number) => void;
  index: number;
  message: Message;
}) {
  const { deleteMessage } = useMessagesStore();

  const messageType = index === 0 ? message.type : message.type === "result" ? "result" : `${message.type} ${index}`;

  return (
    <div className="message-box">
      <div className="message-text">
        <div className="message-type">{messageType}</div>
        <div
          className="message-content"
          contentEditable={message.editable}
          onBlur={(e) => handleBlur(e, index)} // input 입력받고, focus out 시 값 update
        >
          {message.content}
        </div>
      </div>
      <div className="message-icon">
        {messageType !== "Definition" && (
          <div className="message-icon-trash" onClick={() => deleteMessage(index)}>
            <VscTrash />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatContent;
