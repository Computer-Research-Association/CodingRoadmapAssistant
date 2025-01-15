import { useRef, useState } from "react";

function ChatInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputHeight, setInputHeight] = useState("18px");

  const handleInputResize = () => {
    const input = inputRef.current;
    if (input !== null) {
      input.style.height = "18px";
      const height = input.scrollHeight + "px";
      setInputHeight(height);
    }
  };

  return (
    <div className="chat-input-container">
      <div
        className="chat-input"
        ref={inputRef}
        contentEditable="true"
        onInput={handleInputResize}
        style={{ height: inputHeight }}></div>
    </div>
  );
}

export default ChatInput;
