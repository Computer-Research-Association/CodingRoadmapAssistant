import * as vscode from 'vscode';
import OpenAI from 'openai';
const openai = new OpenAI();

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		// registers a webview provider
		// this is needed for webviews for the sidebar. `createWebviewPanel()` can be used for webviews shown in the editor
		vscode.window.registerWebviewViewProvider("CRAView", new CRAViewProvider(context))
	)
}

export class CRAViewProvider implements vscode.WebviewViewProvider {
	constructor(private context: vscode.ExtensionContext) {}

	// required method by inheritance
	// called when the webview is first visible
	public resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken): Thenable<void> | void {
		/**
		 * sets options for the webview
		 * possible options: enableCommandUris, enableForms, and enableScripts
		 */
		webviewView.webview.options = {
			enableScripts: true,
		}
		
		// sets the HTML contents of the webview
		webviewView.webview.html = this.getWebviewContent();

		// posts a message to the webview
		webviewView.webview.postMessage("test");

		// creates an active listener for posted messages from the webview
		webviewView.webview.onDidReceiveMessage(
			async message => {
				switch (message.command) {
					case "textMessage":
						// vscode.window.showInformationMessage(message.text)

						const gptCompletion = await openai.chat.completions.create({
							model: "gpt-4o-mini",
							messages: [
								{
									role: "developer",
									content: message.text,
								},
							],
						});

						const gptGeneratedMessage = gptCompletion.choices[0].message.content;
						if (gptGeneratedMessage !== null) {
							vscode.window.showInformationMessage(gptGeneratedMessage);
						}

					return;
				}
			},
			undefined
		)
	}

	// `acquireVsCodeApi()` is used to access the VS Code API object from the webview
	// the lifetime of the instance that receives the API is the entirety of the session
	// `vscode.postMessage()` is used to post messages to listeners
	getWebviewContent() {
		return `
				<!DOCTYPE html>
					<html lang="en">
					<head>
							<meta charset="UTF-8">
							<title>Input to VS Code API</title>
							<script>
									window.addEventListener('DOMContentLoaded', () => {
											const vscode = acquireVsCodeApi();
											
											const form = document.querySelector('form');
											form.addEventListener('submit', (event) => {
													event.preventDefault();
													const input = document.getElementById('message').value;
													vscode.postMessage({ command: 'textMessage', text: input });
											});
									});
							</script>
					</head>
					<body>
							<h1>Send Input to VS Code</h1>
							<form>
									<input type="text" id="message" name="textMessage"> 
									<button type="submit">Submit</button>
							</form>
					</body>
					</html>
		`;
	}
}

export function deactivate() {}
