import useMessagesStore from "../stores/messagesStore";
import "../styles/ChatContent.css";
import { VscTrash } from "react-icons/vsc";
import React from "react";
import { Message } from "../types/messageStoreTypes";

function ChatContent() {
  const { messages, updateMessage } = useMessagesStore();

  const handleBlur = (e: React.ChangeEvent<HTMLDivElement>, index: number) => {
    updateMessage(index, e.target.innerText);
  };

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

  return (
    <div className="message-box">
      <div className="message-text">
        <div className="message-type">{index === 0 ? message.type : `${message.type} ${index}`}</div>
        <div
          className="message-content"
          contentEditable={message.editable}
          onBlur={(e) => handleBlur(e, index)} // input 입력받고, focus out 시 값 update
        >
          {message.content}
        </div>
      </div>
      <div className="message-icon">
        <div className="message-icon-trash" onClick={() => deleteMessage(index)}>
          <VscTrash />
        </div>
      </div>
    </div>
  );
}

export default ChatContent;
