// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "coding-roadmap-assistant" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const openWebViewCommand = vscode.commands.registerCommand(
    "coding-roadmap-assistant.openWebView",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "webviewExample",
        "My Webview",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.joinPath(context.extensionUri, "media"),
          ],
        }
      );
      const htmlContent = `
            <html>
                <body>
                    <h1>Welcome to the Webview!</h1>
                    <button onclick="alert('Button clicked!')">Click Me!</button>
                </body>
            </html>
        `;
      panel.webview.html = htmlContent;
      panel.webview.onDidReceiveMessage(
        (message) => {
          if (message.command === "alert") {
            vscode.window.showInformationMessage(message.text);
          }
        },
        undefined,
        context.subscriptions
      );
    }
  );
  const disposable = vscode.commands.registerCommand(
    "coding-roadmap-assistant.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage(
        "Hello World from Coding Roadmap Assistant!"
      );
    }
  );

  context.subscriptions.push(openWebViewCommand, disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
