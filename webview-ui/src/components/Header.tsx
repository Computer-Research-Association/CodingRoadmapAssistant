import "../styles/Header.css";
import useMessagesStore from "../stores/messagesStore";
import { AiOutlineClear } from "react-icons/ai";
import { VscHistory } from "react-icons/vsc";
import { vscode } from "../utilities/vscode";

function Header() {
  const { clearMessages } = useMessagesStore();
  const handleHistoryClick = () => {
    vscode.postMessage({
      command: "history",
    });
  };

  return (
    <>
      <div className="header flex">
        <div className="title">Chat with CRA</div>
        <div className="icon flex">
          <div className="icon-clear" onClick={clearMessages}>
            <AiOutlineClear />
          </div>
          <div className="icon-history" onClick={handleHistoryClick}>
            <VscHistory />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
