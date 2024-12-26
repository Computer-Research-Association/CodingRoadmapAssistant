import * as vscode from "vscode";

/**
 * @description Open API 입력받는 disposable 객체
 */
export const setApiKey: vscode.Disposable = vscode.commands.registerCommand("openAI.setAPIKey", async () => {
  const apiKey = await vscode.window.showInputBox({
    prompt: "Enter your OpenAI API key.",
    placeHolder: "Open API Key",
    ignoreFocusOut: true,
    password: true,
  });

  // apiKey 입력받았을 시 user setting에 gpt api 키 등록
  if (apiKey) {
    await vscode.workspace.getConfiguration().update("openAI.apiKey", apiKey, vscode.ConfigurationTarget.Global);
    vscode.window.showInformationMessage("Open AI API key saved successfully.");
  } else {
    vscode.window.showInformationMessage("No API key entered.");
  }
});
