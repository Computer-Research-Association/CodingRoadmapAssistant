import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("showInputPage on active!");

  context.subscriptions.push(
    vscode.commands.registerCommand("coding-roadmap-assistant.inputPanel", () => {
      const panel = vscode.window.createWebviewPanel(
        "inputPanel", //webview 의 타입을 정한다. internally use.
        "Input Panel", //user에게 보여지는 panel의 제목.
        vscode.ViewColumn.One, //새로운 웹뷰 패널을 보여주는 에디터 column.
        {} //웹뷰 옵션.
      );

      panel.webview.html = getWebviewContent();
    })
  );
}

function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Input of the user steps</title>
</head>
<body>
    <h1>Find the path of your coding logic!</h1>
    <h4>문제 정의</h4>
    <input class="def-btn"></input>
    <h4>steps</h4>
    <input class="step-btn"></input>
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
</body>
</html>`;
}

export function deactivate() {}
