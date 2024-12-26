import * as vscode from "vscode";
import * as path from "path";

// 데이터를 저장할 변수
let savedData: string[] = [];

export function registerWebviewViewProvider(context: vscode.ExtensionContext) {
  vscode.window.registerWebviewViewProvider("craView", {
    resolveWebviewView: (webviewView) => {
      webviewView.webview.options = {
        enableScripts: true, // 스크립트 활성화
      };

      // Webview HTML 설정
      webviewView.webview.html = getWebviewContent(context, savedData);

      // Webview에서 데이터를 받는 핸들러 설정
      webviewView.webview.onDidReceiveMessage((message) => {
        switch (message.command) {
          case "save":
            savedData.push(message.value);
            webviewView.webview.html = getWebviewContent(context, savedData);
            break;
        }
      });
    },
  });
}

// Webview에 표시할 HTML 콘텐츠 생성
function getWebviewContent(
  context: vscode.ExtensionContext,
  data: string[]
): string {
  const scriptUri = vscode.Uri.file(
    path.join(context.extensionPath, "media", "webview.js")
  ).with({ scheme: "vscode-resource" });

  const dataString = JSON.stringify(data);

  return `
    <!DOCTYPE html>
    <html>
    <body>
      <h1>저장된 값이 여기에 표시됩니다</h1>
      <div>
        <input type="text" placeholder="여기에 입력하세요" id="input">
        <button id="send">send</button>
        <ul id="list"></ul>
      </div>
      <script>
        const vscode = acquireVsCodeApi();
        const initialData = ${dataString};
      </script>
      <script src="${scriptUri}"></script>
    </body>
    </html>
  `;
}
