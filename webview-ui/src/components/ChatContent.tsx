import useMessagesStore from "../stores/messagesStore";
import "../styles/ChatContent.css";
import { VscTrash } from "react-icons/vsc";
import React, { useEffect, useRef, useState } from "react";
import { Message } from "../types/messageStoreTypes";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiChatNewLine } from "react-icons/ri";
import { GrHistory } from "react-icons/gr";

// import { combineMessages, openai } from "../utilities/openai";

function ChatContent() {
  const { messages, updateMessage, addMessage, loadMessages, setTimestamp } = useMessagesStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleGetGPTResponse = (e: MessageEvent) => {
      const { command, data } = e.data;
      if (command === "setGptResponse") {
        const gptResponseMessage: Message = {
          // 메시지 전달받기
          type: "Result",
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
        <div className="description">
          <p className="intro">
            Welcome to <strong>Coding Roadmap Assistant</strong>, the best way to help your programming solving skills.
          </p>
          <p className="how-to-start-title">
            <strong>How to Start</strong>
          </p>
          <ol className="steps">
            <li>1. First, open the source code file you are working on.</li>
            <li>2. Enter the problem definition you want to solve.</li>
            <li>3. Enter the process of solving the problem step by step.</li>
            <li>
              4. Press <kbd>ctrl + ⏎</kbd> or <kbd>⌘ + ⏎</kbd> to run.
            </li>
            <li>5. After the guiding questions are generated, ask additional questions if needed</li>
            <li>
              6. Press <kbd>ctrl + ⏎</kbd> or <kbd>⌘ + ⏎</kbd> again to run.
            </li>
          </ol>
          <p className="additional-info">
            <strong className="spacing1">
              <RiChatNewLine />
            </strong>{" "}
            <span className="spacing1">New Chat</span>
            <br />
            <strong className="spacing2">
              <GrHistory />
            </strong>{" "}
            <span className="spacing2">Chat History</span>
          </p>
        </div>
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
  const { deleteMessage, clearMessages } = useMessagesStore();
  const [additionalContent, setAdditionalContent] = useState<React.ReactNode | null>(null);

  const messageType =
    message.type === "Result"
      ? "Result"
      : message.type.startsWith("Result")
        ? `${message.type} ${index}`
        : message.type;
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [additionalContent]);

  const clickQuestionBtn = () => {
    setAdditionalContent(<div>Type your question in the input box below ⬇️</div>);
  };

  const clickNewQuestionBtn = () => {
    setAdditionalContent(
      <div>
        Are you sure you want to make another question? (conversations will be saved in the logs)
        <div>
          <button className="clickNewQuestionBtn-selectYes" onClick={clearMessages}>
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
        {messageType === "Result" && (
          <div>
            <div className="additional-question">
              <button className="additional-question-button" onClick={clickQuestionBtn}>
                Do you have any extra✨ questions?
              </button>
            </div>
            <div className="additional-new">
              <button className="additional-new-button" onClick={clickNewQuestionBtn}>
                Do you want to start a new👀 question?
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
