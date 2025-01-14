import "./App.css";
import { vscode } from "./utilities/vscode";

function App() {
  function handleHowdyClick() {
    vscode.postMessage({
      command: "ready",
      text: "Hey there partner! 🤠",
    });
  }

  return (
    <main>
      <h1>Hello World!</h1>
      <button onClick={handleHowdyClick}>ready</button>
    </main>
  );
}

export default App;
