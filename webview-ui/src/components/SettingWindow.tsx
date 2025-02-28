import useSettingStore from "../stores/settingStore";
import "../styles/SettingWindow.css";
import commonStyles from "../styles/common.module.css";
import { vscode } from "../utilities/vscode";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { VscClose } from "react-icons/vsc";
import { useState } from "react";

function SettingWindow({ onClose, isOpened }: { onClose: () => void; isOpened: boolean }) {
  const [apiKeyShow, setApiKeyShow] = useState(false);
  const handleApiKeyShow = () => {
    setApiKeyShow(!apiKeyShow);
  };

  const { language, apiKey, gptModel, setApiKey, setLanguage, setGptModel } = useSettingStore();

  if (!isOpened) return null;

  return (
    <div className="setting-overlay" draggable={false}>
      <div className="setting-window">
        <div className="close-container">
          <div className="title">Setting</div>
          <div className={commonStyles.icon} onClick={onClose}>
            <VscClose />
          </div>
        </div>

        <div className="settings">
          <label htmlFor="language">
            <span>Language</span>
            <select
              name="language"
              id="language"
              value={language}
              className={commonStyles.select}
              onChange={(e) => {
                console.log("setLanguage as : " + e.target.value);
                setLanguage(e.target.value);
                vscode.postMessage({ command: "setLanguage", value: e.target.value });
              }}>
              <option value="en">English</option>
              <option value="ko">Korean</option>
              <option value="jp">Japanese</option>
              <option value="es">Spanish</option>
              <option value="cn">Chinese</option>
            </select>
          </label>

          <label htmlFor="model">
            <span>Model</span>
            <select
              name="model"
              id="model"
              value={gptModel}
              className={commonStyles.select}
              onChange={(e) => {
                setGptModel(e.target.value);
                vscode.postMessage({ command: "setGPTModel", value: e.target.value });
              }}>
              <option value="gpt-4o-mini">gpt-4o-mini</option>
              <option value="gpt-4o">gpt-4o</option>
              <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
            </select>
          </label>

          <label htmlFor="apiKey">
            <span>API Key</span>
            <div className="input-wrapper">
              <input
                type={apiKeyShow ? "text" : "password"}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  vscode.postMessage({ command: "setAPIKey", value: e.target.value });
                }}
                name="apiKey"
                id="apiKey"
                className="input"
              />
              <div className={commonStyles.icon} onClick={handleApiKeyShow}>
                {apiKeyShow ? <VscEye /> : <VscEyeClosed />}
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default SettingWindow;
