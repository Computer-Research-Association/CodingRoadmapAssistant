import "./styles/App.css";
// import { vscode } from "./utilities/vscode";
import Header from "./components/Header";
import ChatInput from "./components/ChatInput";

function App() {
  // function handleHowdyClick() {
  //   vscode.postMessage({
  //     command: "ready",
  //     text: "Hey there partner! 🤠",
  //   });
  // }

  return (
    <>
      <Header />
      <div className="chat-container">
        <ChatInput />
      </div>
    </>
  );
}

export default App;
