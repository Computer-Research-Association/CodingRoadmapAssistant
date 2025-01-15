import "./styles/App.css";
// import { vscode } from "./utilities/vscode";
import Header from "./components/Header";
import ChatInput from "./components/ChatInput";
import ChatContent from "./components/ChatContent";

function App() {
  // function handleHowdyClick() {
  //   vscode.postMessage({
  //     command: "ready",
  //     text: "Hey there partner! 🤠",
  //   });
  // }

  return (
    <div id="chat">
      <Header />
      <ChatContent />
      <ChatInput />
    </div>
  );
}

export default App;
