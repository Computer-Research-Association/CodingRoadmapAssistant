import { useState } from "react";
import "./styles/App.css";
import Header from "./components/Header";
import ChatInput from "./components/ChatInput";
import ChatContent from "./components/ChatContent";
import SettingWindow from "./components/SettingWindow";

function App() {
  const [isSettingWindowOpened, setIsSettingWindowOpened] = useState(false);

  return (
    <div id="chat">
      <Header onSettingClick={() => setIsSettingWindowOpened(true)} />
      <ChatContent />
      <ChatInput />
      <SettingWindow onClose={() => setIsSettingWindowOpened(false)} isOpened={isSettingWindowOpened} />
    </div>
  );
}

export default App;
