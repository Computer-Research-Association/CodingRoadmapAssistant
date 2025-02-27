import { useEffect, useState } from "react";
import "./styles/App.css";
import Header from "./components/Header";
import ChatInput from "./components/ChatInput";
import ChatContent from "./components/ChatContent";
import SettingWindow from "./components/SettingWindow";
import useSettingStore from "./stores/settingStore";
import { vscode } from "./utilities/vscode";

function App() {
  const [isSettingWindowOpened, setIsSettingWindowOpened] = useState(false);
  const { initializeSettings } = useSettingStore();

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const { command, data } = e.data;

      switch (command) {
        case "setInitialOptions":
          initializeSettings(data.language, data.apiKey, data.gptModel);
          break;
      }
    };

    vscode.postMessage({
      command: "getInitialOptions",
    });

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [initializeSettings]);

  console.log(11);

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
