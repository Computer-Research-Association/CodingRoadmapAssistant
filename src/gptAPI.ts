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

/**
 * @param model Open AI model alias
 */
async function configureModelSelected(model: string): Promise<void> {
  await vscode.workspace.getConfiguration().update("openAI.modelSelected", model, vscode.ConfigurationTarget.Global);
  vscode.window.showInformationMessage(`GPT model (${model}) selected successfully.`);
}

export const setGPTModel: vscode.Disposable = vscode.commands.registerCommand("openAI.setModel", async () => {
  const gptModel = await vscode.window.showInformationMessage(
    "Select a Open AI GPT model",
    {
      detail: `A large model like gpt-4o will offer a very high level of intelligence and strong performance, while having a higher cost per token.
    A small model like gpt-4o-mini offers intelligence not quite on the level of the larger model, but is faster and less expensive per token.
    A reasoning model like the o1 family of models is slower to return a result, and uses more tokens to "think", but is capable of advanced reasoning, coding, and multi-step planning.`,
      modal: true,
    },
    "gpt-4o",
    "gpt-4o-mini",
    "o1"
  );
  if (gptModel) {
    configureModelSelected(gptModel);
  }
});
