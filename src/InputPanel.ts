import * as vscode from "vscode";
import { getNonce } from "./getNonce";

export class InputPanel {
  public static currentPanel: InputPanel | undefined; //현재 활성화된 패널 인스턴스 추적.

  public static readonly viewType = "input-panel"; //webview type. 고유 식별자 역할.

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
    //changed input most recently 를 추적.

    // If we already have a panel, show it.
    if (InputPanel.currentPanel) {
      InputPanel.currentPanel._panel.reveal(column);
      InputPanel.currentPanel._update();
      return;
    }

    // Otherwise, create a new panel. (각각 webview type, title, 에디터 column, 웹뷰 옵션. )
    const panel = vscode.window.createWebviewPanel(InputPanel.viewType, "inputPanel", column || vscode.ViewColumn.One, {
      // Enable javascript in the webview
      enableScripts: true,

      // And restrict the webview to only loading content from our extension's `media` directory.
      localResourceRoots: [
        vscode.Uri.joinPath(extensionUri, "media"),
        vscode.Uri.joinPath(extensionUri, "out/compiled"),
      ],
    });

    InputPanel.currentPanel = new InputPanel(panel, extensionUri);
  }

  public static kill() {
    //활성화된 패널 종료, 자원 정리
    InputPanel.currentPanel?.dispose();
    InputPanel.currentPanel = undefined;
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    //기존 생성된  패널 복원.
    InputPanel.currentPanel = new InputPanel(panel, extensionUri);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    //웹뷰 패널 초기화.
    this._panel = panel;
    this._extensionUri = extensionUri; //리소스 자원 식별자.

    // Set the webview's initial html content
    this._update();

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Handle messages from the webview
    this._panel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case "alert":
            vscode.window.showErrorMessage(message.text);
            return;
        }
      },
      null,
      this._disposables
    );
  }

  public dispose() {
    //패널 종료, 모든 리스너와 자원 정리
    InputPanel.currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private async _update() {
    const webview = this._panel.webview;

    this._panel.webview.html = this._getHtmlForWebview(webview); //웹뷰 콘텐츠 업데이트
    webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "onInfo": {
          if (!data.value) {
            return;
          }
          vscode.window.showInformationMessage(data.value);
          break;
        }
        case "onError": {
          if (!data.value) {
            return;
          }
          vscode.window.showErrorMessage(data.value);
          break;
        }
        // case "tokens": {
        //     await Util.globalState.update(accessTokenKey, data.accessToken);
        //     await Util.globalState.update(refreshTokenKey, data.refreshToken);
        //     break;
        // }
      }
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // // And the uri we use to load this script in the webview
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "main.js"));
    //웹뷰에 로드할 js파일의 uri 생성

    // Uri to load styles into webview
    const stylesResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "reset.css"));
    const stylesMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css"));
    const cssUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "out", "compiled/swiper.css"));

    // 실행 가능한 스크립트 출처 제한. (요청별로 고유값 생성, 특정 리로스만 실행하도록.)
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head> 
				<meta charset="UTF-8">
        <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${
          webview.cspSource
        }; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Input of the user steps</title>
				<link href="${stylesResetUri}" rel="stylesheet">
				<link href="${stylesMainUri}" rel="stylesheet">
        <script nonce="${nonce}">
        </script>
		</head>

      <body>
        <h1>Find the path of your coding logic!</h1>
        <h3>문제 정의</h3>
        <input class="def-btn"></input>
        <h3>steps</h3>
        <input class="step-btn"></input>
        <button class="submit-btn" width="500">submit</button>
        <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
      </body>
      <script arc=${scriptUri} nonce="${nonce}">
	</html>`;
  }
}
