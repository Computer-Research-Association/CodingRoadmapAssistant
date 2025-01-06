import * as vscode from "vscode";

export async function setAPIKey(context: vscode.ExtensionContext) {
  const inputBoxOptions: vscode.InputBoxOptions = {
    prompt: "Enter your OpenAI API key.",
    ignoreFocusOut: true,
    placeHolder: "Open API Key",
    password: true,
  };

  const apiKey = await vscode.window.showInputBox(inputBoxOptions);

  if (!apiKey) {
    vscode.window.showWarningMessage("No API key entered.");
    return "";
  }

  await context.secrets.store("OPENAI_API_KEY", apiKey);
  // context에서 제공하는 secretStorage를 사용하여 api key 를 저장하는 방법

  await vscode.workspace.getConfiguration().update("openAI.apiKey", apiKey, vscode.ConfigurationTarget.Global);
  vscode.window.showInformationMessage("Open AI API key saved successfully.");

  // refresh webview to apply openai api key
  vscode.commands.executeCommand("workbench.action.webview.reloadWebviewAction");

  return apiKey;
}

export async function showModelSelectionQuickPick() {
  await vscode.window.showQuickPick(["gpt-4o", "gpt-4o-mini", "o1", "gpt-3.5-turbo"], {
    placeHolder: "Select GPT Model",
    async onDidSelectItem(item) {
      await vscode.workspace.getConfiguration().update("openAI.modelSelected", item, vscode.ConfigurationTarget.Global);
    },
  });

  // refresh webview to apply openai gpt model
  vscode.commands.executeCommand("workbench.action.webview.reloadWebviewAction");
}

export async function onFirstActivation(context: vscode.ExtensionContext) {
  await setAPIKey(context);
  await showModelSelectionQuickPick();
}

export async function checkApiKeyValidation(context: vscode.ExtensionContext) {
  if (!(await context.secrets.get("OPENAI_API_KEY"))) {
    showApiKeyError(context);
  }
}

export async function showApiKeyError(context: vscode.ExtensionContext) {
  const result = await vscode.window.showErrorMessage(
    "OpenAI API key is not configured.\nWant to configure?",
    "YES",
    "NO"
  );
  if (result === "YES") {
    setAPIKey(context);
  }
}

//save initial prompting message
export async function initPromptMessage(context: vscode.ExtensionContext) {
  const data = [
    {
      role: "system",
      content:
        "You are my coding assistant to enhance my coding skills. From now on, I’ll give you some coding problems and the user’s attempts to solve them. Also you may be given logical steps of the user’s code.",
    },
    {
      role: "system",
      content:
        "Generate the output that includes the following points. 1. Never give the answer. Including code. 2. tutor him. must ask questions. make sure the user understands it themselves. 3. for each logical step, provide three questions made in step 2. number each question 1, 2, 3 for each logical step. ",
    },
  ];
  context.globalState.update("conversationLogs", data);
}

// global state 저장소에 올리는 함수. (하나의 value에 communication 정보 한꺼번에 저장)
export async function saveLogToGlobalState(context: vscode.ExtensionContext, log: any) {
  const data = context.globalState.get<any[]>("conversationLogs") || []; //기존 저장되있던 log 가져오기
  data.push(...log);

  context.globalState.update("conversationLogs", data);
}

export function getAllOpenedDocuments(): readonly vscode.TextDocument[] {
  return vscode.workspace.textDocuments;
}
