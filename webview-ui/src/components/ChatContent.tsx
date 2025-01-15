import useMessagesStore from "../stores/messagesStore";
function ChatContent() {
  const { messages } = useMessagesStore();

  return (
    <main id="chat-container">
      {messages && messages.length > 0 ? (
        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={message.type + index} className="message-box">
              <div className="message-type">{message.type}</div>
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
