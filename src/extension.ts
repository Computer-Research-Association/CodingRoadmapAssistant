import * as vscode from "vscode";
import { InputPanel } from "./inputPanel";

type Props = {};

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "coding-roadmap-assistant" is now active!');
  const disposable = vscode.commands.registerCommand("coding-roadmap-assistant.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from Coding Roadmap Assistant!");
  });
  context.subscriptions.push(disposable);

  context.subscriptions.push(
    vscode.commands.registerCommand("coding-roadmap-assistant.inputPanel", InputPanel.createOrShow)
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
