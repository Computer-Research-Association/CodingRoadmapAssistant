import useMessagesStore from "../stores/messagesStore";
import "../styles/ChatContent.css";
import { VscTrash } from "react-icons/vsc";
import React, { useState } from "react";

function ChatContent() {
  const { messages, deleteMessage, updateMessage } = useMessagesStore();
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number | null>(null);

  // 클릭한 박스의 인덱스, set
  const handleBoxClick = (index: number) => {
    setSelectedBoxIndex(index);
  };

  const handleOtherClick = () => {
    setSelectedBoxIndex(null);
  };

  // update message when focus out, initialize index
  const handleBlur = (e: React.ChangeEvent<HTMLDivElement>, index: number) => {
    updateMessage(index, e.target.innerText);
    setSelectedBoxIndex(null); // 편집 종료
  };

  return (
    <main id="chat-container" onClick={handleOtherClick}>
      {messages && messages.length > 0 ? (
        <div className="messages-container flex" onClick={(e) => e.stopPropagation()}>
          {messages.map((message, index) => (
            <div
              key={message.type + index}
              className={`message-box  ${selectedBoxIndex === index ? " selected" : ""}`}
              onClick={() => handleBoxClick(index)} // 특정 박스 클릭 시, index update
            >
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

              {selectedBoxIndex === index && ( // when user clicked
                <div className="message-icon">
                  <div className="message-icon-trash" onClick={() => deleteMessage(index)}>
                    <VscTrash />
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
