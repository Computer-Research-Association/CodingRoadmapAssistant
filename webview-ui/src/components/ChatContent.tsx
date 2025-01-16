import useMessagesStore from "../stores/messagesStore";
import "../styles/ChatContent.css";
import { VscTrash } from "react-icons/vsc";
import { VscEdit } from "react-icons/vsc";
import { useState } from "react";

function ChatContent() {
  const { messages, deleteMessage } = useMessagesStore();
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number | null>(null);

  const handleBoxClick = (index: number) => {
    setSelectedBoxIndex(index);
  };

  const handleOtherClick = () => {
    setSelectedBoxIndex(null);
  };

  return (
    <main id="chat-container" onClick={handleOtherClick}>
      {messages && messages.length > 0 ? (
        <div className="messages-container flex" onClick={(e) => e.stopPropagation()}>
          {messages.map((message, index) => (
            <div
              key={message.type + index}
              className={`message-box  ${selectedBoxIndex === index ? " selected" : ""}`}
              onClick={() => handleBoxClick(index)}>
              <div className="message-text">
                <div className="message-type">{index === 0 ? message.type : `${message.type} ${index}`}</div>
                <div className="message-content">{message.content}</div>
              </div>
              {selectedBoxIndex === index && (
                <div className="message-icon">
                  <div className="message-icon-trash" onClick={() => deleteMessage(index)}>
                    <VscTrash />
                  </div>
                  <div className="message-icon-edit">
                    <VscEdit />
                  </div>
                </div>
              )}
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
