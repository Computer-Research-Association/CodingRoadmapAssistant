import * as vscode from "vscode";
import CRAWebviewViewProvider from "./webview";
import { showModelSelectionQuickPick, setAPIKey } from "./craConfigManager";

export async function activate(context: vscode.ExtensionContext) {
  const isInitialized = context.globalState.get<boolean>("isInitialized");
  if (!isInitialized) {
    await setAPIKey(context);
    await showModelSelectionQuickPick();

    context.globalState.update("isInitialized", true);
  }

  const CRAViewProvider = new CRAWebviewViewProvider(context);

  context.subscriptions.push(
    vscode.commands.registerCommand("openAI.setAPIKey", setAPIKey),
    vscode.commands.registerCommand("openAI.setModel", showModelSelectionQuickPick),
    vscode.window.registerWebviewViewProvider("craView", CRAViewProvider, {
      // Webview 등록
      webviewOptions: { retainContextWhenHidden: true }, //webview 닫아도 요소 유지
    })
  );
}

export function deactivate() {}
