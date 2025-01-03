import * as assert from "assert";
import * as sinon from "sinon";
import * as vscode from "vscode";
import * as path from "path";
import "dotenv/config";

import CRAWebviewViewProvider from "../webview";
import { setAPIKey, showApiKeyError } from "../craConfigManager";

suite("CRAWebviewViewProvider Tests", () => {
  test("[TEST] resolveWebviewView() Webview configuration", () => {
    const mockContext = {
      subscriptions: [],
      extensionUri: vscode.Uri.file(path.join(__dirname, "../../")), // path to extension
      extensionPath: path.join(__dirname, "../../"), // path to extension
    } as unknown as vscode.ExtensionContext;

    // all parameters are overwritten in resolveWebviewView()
    const mockWebviewView = {
      webview: {
        options: {},
        html: "",
        asWebviewUri: (uri: vscode.Uri) => uri,
        onDidReceiveMessage: () => {},
      },
    } as unknown as vscode.WebviewView;

    const provider = new CRAWebviewViewProvider(mockContext);
    provider.resolveWebviewView(mockWebviewView, {} as any, {} as any);

    assert.ok(mockWebviewView.webview.options.enableScripts, "webviewView.options.enableScripts should be true");
    assert.ok(mockWebviewView.webview.html.includes("<!doctype html>"), "webviewView.html not loaded");
  });
});
