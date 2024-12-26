import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

// 데이터를 저장할 변수
let savedData: string[] = [];

export function registerWebviewViewProvider(context: vscode.ExtensionContext) {
  vscode.window.registerWebviewViewProvider("craView", {
    resolveWebviewView: (webviewView) => {
      webviewView.webview.options = {
        enableScripts: true, // 스크립트 활성화
      };

      // HTML 파일 읽기
      const htmlPath = path.join(
        context.extensionPath,
        "media",
        "webview.html"
      );
      let htmlContent = fs.readFileSync(htmlPath, "utf-8");

      // Webview HTML 설정
      webviewView.webview.html = htmlContent;

      // Webview에서 데이터를 받는 핸들러 설정
      webviewView.webview.onDidReceiveMessage((message) => {
        switch (message.command) {
          case "save":
            savedData.push(message.value);
            console.log("Saved Data:", savedData);
            // 웹뷰에 데이터 전달
            webviewView.webview.postMessage({
              command: "setData",
              data: savedData,
            });
            break;
        }
      });
    },
  });
}
