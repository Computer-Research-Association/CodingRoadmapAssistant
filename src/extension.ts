import * as vscode from "vscode";
import { registerWebviewViewProvider } from "./webview";
import { showModelSelectionQuickPick, showApiKeyInputBox } from "./craConfigManager";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "coding-roadmap-assistant" is now active!');

  const disposable = vscode.commands.registerCommand("coding-roadmap-assistant.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from Coding Roadmap Assistant!");
  });

  const showAPIKeyInput = vscode.commands.registerCommand("openAI.setAPIKey", showApiKeyInputBox);
  const showModelSelection = vscode.commands.registerCommand("openAI.setModel", showModelSelectionQuickPick);

  context.subscriptions.push(disposable, showModelSelection, showAPIKeyInput);

  registerWebviewViewProvider(context);// Webview 등록

}

export function deactivate() {}
