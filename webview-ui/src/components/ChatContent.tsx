import useMessagesStore from "../stores/messagesStore";
import "../styles/ChatContent.css";
import { VscTrash } from "react-icons/vsc";
import { VscEdit } from "react-icons/vsc";
import React, { useState } from "react";

function ChatContent() {
  const { messages, deleteMessage, updateMessage } = useMessagesStore();
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // editing message's index
  const [editedContent, setEditedContent] = useState<string>(""); // set after edited message's content

  const handleBoxClick = (index: number) => {
    // 클릭한 박스의 인덱스
    setSelectedBoxIndex(index);
  };
  const handleOtherClick = () => {
    setSelectedBoxIndex(null);
  };

  const handleEditClick = (index: number, currentContent: string) => {
    // 현래 누른 박스의 정보 업데이트
    setEditingIndex(index);
    setEditedContent(currentContent);
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    //contentEditable 에서 text 변경 감지 시, content update
    setEditedContent(e.target.innerText);
  };

  const handleBlur = (index: number) => {
    // update message when focus out
    updateMessage(index, editedContent); // 메시지 업데이트
    setEditingIndex(null); // 편집 종료
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
                {editingIndex === index ? ( //바꾸려는 인덱스 발견 시,
                  <div
                    className="message-content"
                    contentEditable={true}
                    onBlur={() => handleBlur(index)} // 메시지 업데이트
                    onInput={handleContentChange}>
                    {editedContent}
                  </div>
                ) : (
                  <div className="message-content">{message.content}</div>
                )}
              </div>

              {selectedBoxIndex === index && (
                <div className="message-icon">
                  <div className="message-icon-trash" onClick={() => deleteMessage(index)}>
                    <VscTrash />
                  </div>
                  <div className="message-icon-edit" onClick={() => handleEditClick(index, message.content)}>
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
