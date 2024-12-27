import * as vscode from "vscode";
import { showModelSelectionQuickPick } from "./craConfigManager";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "coding-roadmap-assistant" is now active!');

  const disposable = vscode.commands.registerCommand("coding-roadmap-assistant.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from Coding Roadmap Assistant!");
  });

  const showModelSelection = vscode.commands.registerCommand("openAI.setModel", showModelSelectionQuickPick);

  context.subscriptions.push(disposable, showModelSelection);
}

// This method is called when your extension is deactivated
export function deactivate() {}
