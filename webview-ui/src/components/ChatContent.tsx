import useMessagesStore from "../stores/messagesStore";
import "../styles/ChatContent.css";
import { VscTrash } from "react-icons/vsc";
import React from "react";

function ChatContent() {
  const { messages, deleteMessage, updateMessage } = useMessagesStore();

  const handleBlur = (e: React.ChangeEvent<HTMLDivElement>, index: number) => {
    updateMessage(index, e.target.innerText);
  };

  return (
    <main id="chat-container">
      {messages && messages.length > 0 ? (
        <div className="messages-container flex" onClick={(e) => e.stopPropagation()}>
          {messages.map((message, index) => (
            <div key={message.type + index} className={`message-box`}>
              <div className="message-text">
                <div className="message-type">{index === 0 ? message.type : `${message.type} ${index}`}</div>
                <div
                  className="message-content"
                  contentEditable={true}
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
          ))}
        </div>
      ) : (
        <div className="learnCRA">LEARN CRA!!!</div>
      )}
    </main>
  );
}

export default ChatContent;
