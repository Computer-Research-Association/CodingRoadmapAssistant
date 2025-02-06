import useMessagesStore from "../stores/messagesStore";
import "../styles/ChatContent.css";
import { VscTrash } from "react-icons/vsc";
import React, { useEffect, useRef, useState } from "react";
import { Message } from "../types/messageStoreTypes";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { combineMessages, openai } from "../utilities/openai";

function ChatContent() {
  const { messages, updateMessage, addMessage, loadMessages, setTimestamp } = useMessagesStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleGetGPTResponse = (e: MessageEvent) => {
      const { command, data } = e.data;
      if (command === "setGptResponse") {
        const gptResponseMessage: Message = {
          // 메시지 전달받기
          type: "result",
          content: data,
          editable: false,
        };
        addMessage(gptResponseMessage);
        setLoading(false);
      } else if (command === "setLoading") {
        setLoading(data);
      } else if (command === "setSelectedLog") {
        setTimestamp(data.timestamp);
        loadMessages(data.messages as Message[]);
      }
    };

    window.addEventListener("message", handleGetGPTResponse);
    return () => {
      window.removeEventListener("message", handleGetGPTResponse);
    };
  }, [addMessage, loadMessages, setTimestamp]);

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
  const { deleteMessage, messages, stepCount } = useMessagesStore();
  const [additionalContent, setAdditionalContent] = useState<React.ReactNode | null>(null);

  const messageType =
    message.type === "result" ? "result" : message.type.startsWith("Step") ? `${message.type} ${index}` : message.type;
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" }); // 자신이 호출된 요소가 사용자에게 표시되도록 상위 컨테이너를 스크롤
  }, [additionalContent]);

  const sendAdditionalQuestion = () => {
    openai.sendAdditionalMessage(combineMessages(messages, stepCount));
  };

  const clickAdditionalQuestionBtn = () => {
    setAdditionalContent(<div>Type your question into the below input box ⬇️</div>);
  };

  const clickNewQuestionBtn = () => {
    setAdditionalContent(
      <div>
        Do you sure you want to make another question? (conversations will be save at the log)
        <div>
          <button className="clickNewQuestionBtn-selectYes" onClick={sendAdditionalQuestion}>
            Yes
          </button>
          <button className="clickNewQuestionBtn-selectNo" onClick={() => setAdditionalContent(null)}>
            No
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="message">
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
      <div className="additional">
        {messageType === "result" && (
          <div>
            <div className="additional-question">
              <button className="additional-question-button" onClick={clickAdditionalQuestionBtn}>
                🐜 Do you have any extra question?
              </button>
            </div>
            <div className="additional-new">
              <button className="additional-new-button" onClick={clickNewQuestionBtn}>
                👀 Do you want to start a new question?
              </button>
            </div>
            {additionalContent && <div className="additional-content">{additionalContent}</div>}
          </div>
        )}
      </div>
      <div ref={messageEndRef}></div>
    </div>
  );
}

export default ChatContent;
