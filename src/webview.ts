import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import OpenAI from "openai";

// VSCode의 settings.json에서 API 키를 가져옵니다.
const openai = new OpenAI({
  apiKey: vscode.workspace
    .getConfiguration("codingRoadmapAssistant")
    .get<string>("openaiApiKey"),
});

// GPT API 호출 함수
async function main(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // 최신 모델로 변경
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });
    return (
      completion.choices[0]?.message?.content.trim() || "No response from GPT."
    );
  } catch (error: any) {
    console.error("GPT API Error:", error); // 콘솔에 상세 에러 출력
    return `Error: ${error.message || "Unknown error occurred."}`; // 사용자에게 반환
  }
}

export function registerWebviewViewProvider(context: vscode.ExtensionContext) {
  vscode.window.registerWebviewViewProvider("craView", {
    resolveWebviewView: async (webviewView) => {
      // 웹뷰의 옵션에 localResourceRoots를 설정
      webviewView.webview.options = {
        enableScripts: true, // 자바스크립트 활성화
        localResourceRoots: [
          vscode.Uri.joinPath(context.extensionUri, "media"), // media 폴더를 로컬 리소스로 설정
        ],
      };

      // HTML 파일 읽기
      const htmlPath = path.join(
        context.extensionPath,
        "media",
        "webview.html"
      );
      let htmlContent = fs.readFileSync(htmlPath, "utf-8");

      // 웹뷰 HTML 내에서 자바스크립트 파일 경로를 로컬 URI로 변환하여 사용
      const scriptUri = webviewView.webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, "media", "webview.js")
      );

      // HTML 내용에서 script 태그를 삽입할 부분
      htmlContent = htmlContent.replace(
        /<script src="webview.js"><\/script>/,
        `<script src="${scriptUri}"></script>`
      );

      // 웹뷰 HTML 설정
      webviewView.webview.html = htmlContent;

      // 웹뷰에서 데이터를 받는 핸들러 설정
      webviewView.webview.onDidReceiveMessage(async (message) => {
        switch (message.command) {
          case "process":
            // GPT API 호출
            const gptResponse = await main(message.value);
            // 웹뷰로 결과 전달
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
