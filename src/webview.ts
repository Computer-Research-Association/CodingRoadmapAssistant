import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import OpenAI from "openai";
import { showApiKeyError } from "./craConfigManager";

export default class CRAWebviewViewProvider implements vscode.WebviewViewProvider {
  private apiKey?: string;
  private context: vscode.ExtensionContext;
  private openai?: OpenAI;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.getApiKey();
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    // 웹뷰의 옵션에 localResourceRoots를 설정
    webviewView.webview.options = {
      enableScripts: true, // 자바스크립트 활성화
      localResourceRoots: [
        vscode.Uri.joinPath(this.context.extensionUri, "media"), // media 폴더를 로컬 리소스로 설정
      ],
    };

    // HTML 파일 읽기
    const styleUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, "media", "style.css")
    );
    const htmlPath = path.join(this.context.extensionPath, "media", "webview.html");
    let htmlContent = fs.readFileSync(htmlPath, "utf-8");

    htmlContent = htmlContent.replace("</head>", `<link rel="stylesheet" href="${styleUri}"></head>`);

    //웹뷰 HTML 내에서 자바스크립트 파일 경로를 로컬 URI로 변환하여 사용
    const scriptUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, "media", "webviewscript.js")
    );

    //HTML 내용에서 script 태그를 삽입할 부분
    htmlContent = htmlContent.replace(
      /<script src="webviewscript.js"><\/script>/,
      `<script src="${scriptUri}"></script>`
    );

    //웹뷰 HTML 설정
    webviewView.webview.html = htmlContent;

    console.log("flag1 -- html 불러오기");
    //웹뷰에서 데이터를 받는 핸들러 설정
    webviewView.webview.onDidReceiveMessage(async (message) => {
      console.log("flag2 -- 웹뷰에서 데이터 받아오기");

      switch (message.command) {
        case "process":
          //GPT API 호출
          const gptResponse = await this.callGptApi(message.value);
          console.log("GPT Response: " + gptResponse);
          //웹뷰로 결과 전달
          webviewView.webview.postMessage({
            command: "setData",
            data: gptResponse,
          });
          break;
      }
    });
  }

  // GPT API 호출 함수
  private async callGptApi(prompt: string) {
    console.log("flag3 -- gpt 호출");

    const model = vscode.workspace.getConfiguration().get<string>("openAI.modelSelected"); //configuration에 저장되있는 model 정보.
    if (!model) {
      return "No model selected. Please configure the OpenAI model.";
    }

    try {
      if (!this.openai) {
        throw new Error();
      }
      const completion = await this.openai.chat.completions.create({
        //gpt에게 사용자 질문 보낸 결과를 담은 객체.
        model, // 최신 모델로 변경
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        temperature: 0.7,
      });
      console.log("gpt sending success >> prompt: " + prompt);

      if (completion.choices[0]?.message?.content === null) {
        return "No response from GPT.";
      }
      console.log("gpt output >> " + completion.choices[0]);
      return completion.choices[0]?.message?.content.trim();
    } catch (error: any) {
      console.error("GPT API Error:", error); // 콘솔에 상세 에러 출력
      return `Error: ${error.message || "Unknown error occurred."}`; // 사용자에게 반환
    }
  }

  private async setOpenaiWithApiKey(apiKey: string | undefined) {
    if (!apiKey) {
      showApiKeyError(this.context);
    }

    this.openai = new OpenAI({
      apiKey: this.apiKey,
    });
  }

  // 사용자 API 키 가져오기
  private async getApiKey() {
    this.apiKey = await this.context.secrets.get("OPENAI_API_KEY");

    if (!this.apiKey) {
      vscode.window.showErrorMessage("OpenAI API Key is missing.");
    }

    //OpenAI 객체 생성
    this.setOpenaiWithApiKey(this.apiKey);
  }
}
