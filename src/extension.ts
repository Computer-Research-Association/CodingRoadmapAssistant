import * as vscode from "vscode";
import { registerWebviewViewProvider } from "./webview";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "practice" is now active!');

  // Webview 등록
  registerWebviewViewProvider(context);

  // 명령어 등록
  const disposable = vscode.commands.registerCommand("print helloworld", () => {
    vscode.window.showInformationMessage("Hello Print");
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
