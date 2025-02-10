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

/**
 * Saves the given log to the global state under the key "conversationLogs".
 * The log is appended to the existing list of logs.
 * @param context The extension context.
 * @param log The log to be saved. {timestamp: string, content: string}
 */
export async function saveLogToGlobalState(context: vscode.ExtensionContext, log: any) {
  let data = context.globalState.get<any[]>("conversationLogs") || []; //기존 저장되있던 log 가져오기

  const index = data.findIndex((item) => item.timestamp === log.timestamp);

  if (index === -1) {
    data.push(log);
  } else {
    data[index] = log;
  }

  context.globalState.update("conversationLogs", data);
}

export function getAllOpenedDocuments(): readonly vscode.TextDocument[] {
  return vscode.workspace.textDocuments;
}

export async function pickConversationLog(context: vscode.ExtensionContext): Promise<any | null> {
  const conversationLogs = context.globalState.get<any[]>("conversationLogs") || [];

  if (!conversationLogs) {
    return handleError(context, "There is no conversation log");
  }

  const quickPick = vscode.window.createQuickPick();

  const updateQuickPickItems = (logs: any[]) => {
    quickPick.items = logs.map(
      (log) => new ConversationLogQuickPickItem(log.messages[0].content, new Date(log.timestamp).toISOString(), log)
    );
  };

  updateQuickPickItems(conversationLogs);
  quickPick.placeholder = "Select a log";
  quickPick.ignoreFocusOut = true;

  return new Promise<any | null>((resolve) => {
    quickPick.onDidAccept(() => {
      const selectedItem = quickPick.selectedItems[0] as ConversationLogQuickPickItem;
      quickPick.hide();
      resolve(selectedItem?.log || null);
    });

    quickPick.onDidTriggerItemButton(async (event) => {
      const item = event.item as ConversationLogQuickPickItem;

      // get fresh data from globalState (after changed data)
      const currentLogs = context.globalState.get<any[]>("conversationLogs") || [];

      // Remove the log from globalState
      const updatedLogs = currentLogs.filter((log) => log.timestamp !== item.log.timestamp);
      await context.globalState.update("conversationLogs", updatedLogs);

      // update quickPick item into updatedLogs
      updateQuickPickItems(updatedLogs);

      if (updatedLogs.length === 0) {
        quickPick.hide();
        resolve(null);
      }
    });

    quickPick.onDidHide(() => {
      quickPick.dispose();
      if (!quickPick.selectedItems.length) {
        resolve(null);
      }
    });

    quickPick.show();
  });
}

function handleError(context: vscode.ExtensionContext, message: string): null {
  vscode.window.showErrorMessage(message);
  context.globalState.update("selectedTextDocument", null);
  return null;
}

/**
 * @member label: problem definition
 * @member description: for timestamp
 * @member log: selected conversation log itself
 * @member buttons: delete button
 */
class ConversationLogQuickPickItem implements vscode.QuickPickItem {
  label: string;
  description: string | undefined;
  log: any;
  buttons: readonly vscode.QuickInputButton[];

  constructor(label: string, description: string | undefined, log: any) {
    this.label = label;
    this.description = description;
    this.log = log;
    this.buttons = [
      {
        iconPath: new vscode.ThemeIcon("trash"),
        tooltip: "Delete this conversation log",
      },
    ];
  }
}
