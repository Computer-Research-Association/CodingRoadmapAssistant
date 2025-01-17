import * as vscode from "vscode";
import { GPTTokens, supportModelType } from "gpt-tokens";

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

// global state 저장소에 올리는 함수. (하나의 value에 communication 정보 한꺼번에 저장)
export async function saveLogToGlobalState(context: vscode.ExtensionContext, log: any) {
  const data = context.globalState.get<any[]>("conversationLogs") || []; //기존 저장되있던 log 가져오기
  data.push(...log);

  context.globalState.update("conversationLogs", data);
}

export function getAllOpenedDocuments(): readonly vscode.TextDocument[] {
  return vscode.workspace.textDocuments;
}

/**
 * @member label: filename
 * @member description: for uri string
 * @member document: selected TextDocument itself
 */
class FileSelectionQuickPickItem implements vscode.QuickPickItem {
  label: string;
  description: string | undefined;
  document: vscode.TextDocument;

  constructor(label: string, description: string | undefined, document: vscode.TextDocument) {
    this.label = label;
    this.description = description;
    this.document = document;
  }
}

/**
 * 열려있는 document 중 인식할 코드 창 하나를 고르는 것.
 * @param context vscode 전체 state 식별.
 * @returns FileSelectionQuickPickItem.document
 */
export async function pickOpenedDocument(context: vscode.ExtensionContext): Promise<vscode.TextDocument | null> {
  const openedDocs = getAllOpenedDocuments();

  if (!openedDocs) {
    return handleError(context, "There is no opened document");
  }

  const quickPickItems = openedDocs.map((doc) => {
    return new FileSelectionQuickPickItem(doc.fileName.split("/").pop() || doc.fileName, doc.uri.toString(), doc);
  });

  const quickPickOptions: vscode.QuickPickOptions = {
    placeHolder: "Select a document.",
    matchOnDescription: true,
    ignoreFocusOut: true,
  };

  const selectedItem = await vscode.window.showQuickPick(quickPickItems, quickPickOptions);

  if (!selectedItem) {
    return handleError(context, "No Document Selected");
  }

  if (checkGPTTokens(selectedItem.document) > 5000) {
    return handleError(context, "The number of tokens in the selected document exceeds 5000.");
  }

  context.globalState.update("selectedTextDocument", selectedItem.document);

  return selectedItem.document;
}

function handleError(context: vscode.ExtensionContext, message: string): null {
  vscode.window.showErrorMessage(message);
  context.globalState.update("selectedTextDocument", null);
  return null;
}

function checkGPTTokens(document: vscode.TextDocument): number {
  const model = vscode.workspace.getConfiguration().get<string>("openAI.modelSelected");

  const selectedModel = GPTTokens.supportModels.includes(model as supportModelType)
    ? (model as supportModelType)
    : "gpt-4o-mini";

  const tokenUsageInfo = new GPTTokens({
    model: selectedModel,
    messages: [{ role: "user", content: document.getText() }],
  });

  console.log(tokenUsageInfo.usedTokens);
  return tokenUsageInfo.usedTokens;
}
