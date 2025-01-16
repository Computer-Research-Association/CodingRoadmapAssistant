import useMessagesStore from "../stores/messagesStore";
import "../styles/ChatContent.css";

function ChatContent() {
  const { messages } = useMessagesStore();

  const stepIndex = 1;

  return (
    <main id="chat-container">
      {messages && messages.length > 0 ? (
        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={message.type + index} className="message-box">
              <div className="message-type">{index === 0 ? message.type : `${stepIndex}. ${message.type}`}</div>
              <div className="message-content">{message.content}</div>
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
