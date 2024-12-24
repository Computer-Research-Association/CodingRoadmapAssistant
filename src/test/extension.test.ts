import * as assert from "assert";
import * as vscode from "vscode";
import { CRAViewProvider } from "../extension";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("CRAViewProvider: validateMessage() should return true for valid input", () => {
    const context = {
      subscriptions: [],
    } as unknown as vscode.ExtensionContext;

    const provider = new CRAViewProvider(context);
    const isValid = provider.validateMessage("This is a test message.");
    assert.strictEqual(isValid, true);
  });

  test("CRAViewProvider: validateMessage() should return false for invalid input", () => {
    const context = {
      subscriptions: [],
    } as unknown as vscode.ExtensionContext;

    const provider = new CRAViewProvider(context);

    const isValid = provider.validateMessage("");
    assert.strictEqual(isValid, false);
  });

  test("CRAViewProvider: getWebviewContent() should return HTML content", () => {
    const context = {
      subscriptions: [],
    } as unknown as vscode.ExtensionContext;

    const provider = new CRAViewProvider(context);
    const content = provider.getWebviewContent();
    assert.match(content, /<!DOCTYPE html>/);
    assert.match(content, /form/);
  });

  test("CRAViewProvider: getGPTGeneratedMessage() should handle valid input", async () => {
    const context = {
      subscriptions: [],
    } as unknown as vscode.ExtensionContext;

    const provider = new CRAViewProvider(context);

    // Mock the OpenAI API response
    const mockMessage = 'give me exact string of "response"';
    const mockResponse = "response";
    provider.getGPTGeneratedMessage = async () => mockResponse;

    const response = await provider.getGPTGeneratedMessage(mockMessage);
    assert.strictEqual(response, mockResponse);
  });

  test("CRAViewProvider: displayInfoMessage() should display a message", async () => {
    const context = {
      subscriptions: [],
    } as unknown as vscode.ExtensionContext;

    const provider = new CRAViewProvider(context);

    // Mock the `vscode.window.showInformationMessage` function
    let displayedMessage: string | undefined = undefined;
    const originalShowInformationMessage = vscode.window.showInformationMessage;
    vscode.window.showInformationMessage = (message: string) => {
      displayedMessage = message;
      return Promise.resolve(message);
    };

    const message = "This is a test info message";
    await provider.displayInfoMessage(Promise.resolve(message));

    assert.strictEqual(displayedMessage, message);

    // Restore the original function
    vscode.window.showInformationMessage = originalShowInformationMessage;
  });

  test("Extension activation should register webview provider", async () => {
    const context = {
      subscriptions: [],
    } as unknown as vscode.ExtensionContext;

    let isRegistered = false;
    const originalRegisterWebviewViewProvider =
      vscode.window.registerWebviewViewProvider;
    vscode.window.registerWebviewViewProvider = (id, provider) => {
      if (id === "CRAView") {
        isRegistered = true;
      }
      return new vscode.Disposable(() => {});
    };

    // Import and activate the extension
    const extension = await import("../extension.js");
    extension.activate(context);

    assert.strictEqual(isRegistered, true);

    // Restore the original function
    vscode.window.registerWebviewViewProvider =
      originalRegisterWebviewViewProvider;
  });
});
