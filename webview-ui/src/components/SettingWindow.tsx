import { VscClose } from "react-icons/vsc";
import "../styles/SettingWindow.css";
import commonStyles from "../styles/common.module.css";

function SettingWindow({ onClose, isOpened }: { onClose: () => void; isOpened: boolean }) {
  if (!isOpened) return null;

  return (
    <div className="setting-overlay">
      <div className="setting-window">
        <div className="close-container">
          <div className="title">Setting</div>
          <div className={commonStyles.icon} onClick={onClose}>
            <VscClose />
          </div>
        </div>
        <div className="settings">{/* 세팅 옵션들이 들어와야 할 자리입니다. */}</div>
      </div>
    </div>
  );
}

export default SettingWindow;
