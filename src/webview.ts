import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: vscode.workspace.getConfiguration("codingRoadmapAssistant").get<string>("openaiApiKey"),
});

async function main(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });
    return completion.choices[0]?.message?.content.trim() || "No response from GPT.";
  } catch (error: any) {
    console.error("GPT API Error:", error);
    return `Error: ${error.message || "Unknown error occurred."}`;
  }
}

export function registerWebviewViewProvider(context: vscode.ExtensionContext) {
  vscode.window.registerWebviewViewProvider("craView", {
    resolveWebviewView: async (webviewView) => {
      webviewView.webview.options = {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, "media")],
      };

      const styleUri = webviewView.webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, "media", "vscode.css")
      );
      const htmlPath = path.join(context.extensionPath, "media", "webview.html");
      let htmlContent = fs.readFileSync(htmlPath, "utf-8");

      htmlContent = htmlContent.replace("</head>", `<link rel="stylesheet" href="${styleUri}"></head>`);

      const scriptUri = webviewView.webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, "media", "webviewscript.js")
      );

      htmlContent = htmlContent.replace(
        /<script src="webviewscript.js"><\/script>/,
        `<script src="${scriptUri}"></script>`
      );

      webviewView.webview.html = htmlContent;

      webviewView.webview.onDidReceiveMessage(async (message) => {
        switch (message.command) {
          case "process":
            const gptResponse = await main(message.value);
            webviewView.webview.postMessage({
              command: "setData",
              data: gptResponse,
            });
            break;
        }
      });
    },
  });
}
