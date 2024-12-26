import * as vscode from "vscode";
import { registerWebviewViewProvider } from "./webview";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "practice" is now active!');

  // Webview 등록
  registerWebviewViewProvider(context);
}

export function deactivate() {}
