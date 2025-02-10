import * as vscode from "vscode";
import CRAWebviewViewProvider from "./webview";
import { showModelSelectionQuickPick, setAPIKey, onFirstActivation } from "./craConfigManager";

export async function activate(context: vscode.ExtensionContext) {
  const isInitialized = context.globalState.get<boolean>("isInitialized");
  if (!isInitialized) {
    await onFirstActivation(context);
    context.globalState.update("isInitialized", true);
  }
  if (!context.globalState.get<any[]>("conversationLogs")) {
    context.globalState.update("conversationLogs", []);
  }

  const CRAViewProvider = new CRAWebviewViewProvider(context);

  context.subscriptions.push(
    vscode.commands.registerCommand("openAI.setAPIKey", async () => {
      await setAPIKey(context);
    }),
    vscode.commands.registerCommand("openAI.setModel", showModelSelectionQuickPick),
    vscode.window.registerWebviewViewProvider("craView", CRAViewProvider, {
      // Webview 등록
      webviewOptions: { retainContextWhenHidden: true }, //webview 닫아도 요소 유지
    })
  );

  // 초기 editor activated document 정보 전송
  const editor = vscode.window.activeTextEditor;
  setTimeout(() => {
    CRAViewProvider.postMessage({
      command: "activateDocument",
      data: editor?.document.fileName,
    });
  }, 1000);

  vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor && CRAViewProvider.getWebview()) {
      const { document } = editor;
      const message = {
        command: "activateDocument",
        data: document.fileName,
      };
      CRAViewProvider.postMessage(message);
    }
  });
}

export function deactivate() {}
