import "../styles/Header.css";
import useMessagesStore from "../stores/messagesStore";
import { GrHistory } from "react-icons/gr";
import { RiChatNewLine } from "react-icons/ri";
import { VscSettingsGear } from "react-icons/vsc";
import { vscode } from "../utilities/vscode";
import commonStyles from "../styles/common.module.css";

function Header({ onSettingClick }: { onSettingClick: () => void }) {
  const { clearMessages } = useMessagesStore();
  const handleHistoryClick = () => {
    vscode.postMessage({
      command: "history",
    });
  };

  const handleSettingClick = () => {
    onSettingClick();
  };

  return (
    <>
      <div className="header">
        <div className="title">Chat with CRA</div>
        <div className="icon-container">
          <div className={commonStyles.icon} onClick={clearMessages}>
            <RiChatNewLine />
          </div>
          <div className={commonStyles.icon} onClick={handleHistoryClick}>
            <GrHistory />
          </div>
          <div className={commonStyles.icon} onClick={handleSettingClick}>
            <VscSettingsGear />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
