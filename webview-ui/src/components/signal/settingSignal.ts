import { useEffect } from "react";
import useSettingStore from "../../stores/settingStore";

export function useSettingSignal() {
  const vscode = window.acquireVsCodeApi();
  const { setLanguage, language } = useSettingStore();

  useEffect(() => {
    const handleGetSettingSignal = (e: MessageEvent) => {
      //webview.ts 에서 세팅 데이터 전달받고
      const { command, data } = e.data;
      //settingStore 에 저장하기
      if (command === "setLanguage") {
        //vscode에서 가져온 data를 새롭게 설정
        setLanguage(data);
      } else if (command === "updateLanguage") {
        //사용자가 수정한 data를 vscode 로 넘기기
        vscode.postMessage({ command: "updateLanguage", data: language });
      }
    };

    window.addEventListener("message", handleGetSettingSignal);
    return () => {
      window.removeEventListener("message", handleGetSettingSignal);
    };
  }, [setLanguage, language]);
}
