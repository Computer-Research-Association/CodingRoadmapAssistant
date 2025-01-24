import "./styles/App.css";
import Header from "./components/Header";
import ChatInput from "./components/ChatInput";
import ChatContent from "./components/ChatContent";

function App() {
  return (
    <div id="chat">
      <Header />
      <ChatContent />
      <ChatInput />
    </div>
  );
}

export default App;
