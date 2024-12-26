import * as vscode from "vscode";

export class ModelItem implements vscode.QuickPickItem {
  label: string;
  description?: string | undefined;

  constructor(label: string, description?: string) {
    this.label = label;
    this.description = description;
  }
}

export async function showApiKeyInputBox() {
  const apiKey = await vscode.window.showInputBox({
    prompt: "Enter your OpenAI API key.",
    placeHolder: "Open API Key",
    password: true,
  });

  if (apiKey) {
    await vscode.workspace.getConfiguration().update("openAI.apiKey", apiKey, vscode.ConfigurationTarget.Global);
    vscode.window.showInformationMessage("Open AI API key saved successfully.");
  } else {
    vscode.window.showInformationMessage("No API key entered.");
  }
}

export async function showModelSelectionQuickPick() {
  await vscode.window.showQuickPick(["gpt-4o", "gpt-4o-mini", "o1"], {
    placeHolder: "Select GPT Model",
    async onDidSelectItem(item) {
      await vscode.workspace.getConfiguration().update("openAI.modelSelected", item, vscode.ConfigurationTarget.Global);
    },
  });
}
