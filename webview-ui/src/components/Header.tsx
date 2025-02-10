import "../styles/Header.css";
import useMessagesStore from "../stores/messagesStore";
import { GrHistory } from "react-icons/gr";
import { RiChatNewLine } from "react-icons/ri";

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
            <RiChatNewLine />
          </div>
          <div className="icon-history" onClick={handleHistoryClick}>
            <GrHistory />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
