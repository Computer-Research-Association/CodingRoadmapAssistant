import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import OpenAI from "openai";
import { showApiKeyError, saveLogToGlobalState, pickOpenedDocument } from "./craConfigManager";

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

    // webviewscript.js 에서 데이터를 받는 핸들러 설정
    webviewView.webview.onDidReceiveMessage(async (message) => {
      // send request to OpenAI
      switch (message.command) {
        case "process":
          // 사용자 코드 추가
          let textDoc: vscode.TextDocument | null = null;

          while (textDoc === null) {
            textDoc = await pickOpenedDocument(this.context);
            if (!textDoc) {
              vscode.window.showErrorMessage("No document selected. Please select a document.");
              return;
            }
          }
          // 문제정의+단계+전체 코드
          const messageTosend = message + "User's Code: " + textDoc.getText();

          //GPT API 호출
          const gptResponse = await this.callGptApi(messageTosend);
          //웹뷰로 결과 전달
          webviewView.webview.postMessage({
            command: "setData",
            data: gptResponse,
          });

          // save it's answer to the conversationLog
          const gptData = [
            {
              role: "system",
              content: gptResponse,
            },
          ];
          saveLogToGlobalState(this.context, gptData);

          break;
        case "keyword":
          if (!message.data) {
            vscode.window.showErrorMessage("No response data provided for keyword extraction.");
            return;
          }

          // 키워드 추출용 프롬프트
          const keywordPrompt = `I am asking you to extract three important keywords from the following text. 
Your response must only consist of exactly three keywords, separated by commas. Do not provide any additional explanations or phrases. 
Your answer should only be the three keywords, separated by commas, like this: "keyword1, keyword2, keyword3".

Please read the following text and extract three important keywords:\n\n"${message.data}"`;

          // GPT API 호출
          const keywordsResponse = await this.callGptApi(keywordPrompt);

          // 응답을 문자열 배열로 변환 (쉼표 기준 분리)
          // GPT API 호출 결과에서 키워드 배열로 변환
          const keywordsArray = keywordsResponse.split(",").map((keyword) => keyword.trim());

          // 웹뷰로 키워드 배열 전달
          webviewView.webview.postMessage({
            command: "setKeywords",
            data: keywordsArray,
          });
          break;
      }
    });
  }

  // GPT API 호출 함수
  private async callGptApi(prompt: string) {
    const model = vscode.workspace.getConfiguration().get<string>("openAI.modelSelected"); //configuration에 저장되있는 model 정보.
    if (!model) {
      return "No model selected. Please configure the OpenAI model.";
    }

    try {
      if (!this.openai) {
        throw new Error();
      }

      const initPrompt: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
        role: "system",
        content: `You are a program designed to enhance coding skills by helping users identify and address issues in their approach to solving programming problems.
           From now on, I will provide you with three inputs: 
           1. A problem definition.
           2. Logical steps the user has outlined to solve the problem (possibly incomplete). 
           3.The user's attempt at solving the problem in code. Based on these inputs, you must analyze the provided information and respond with only the following two elements
           : 1. An explanation of any inconsistencies between the problem definition, the logical steps, and the code provided. Highlight potential issues or misalignments.
             2. Exactly three guiding questions that encourage users to reflect on their approach, understand the problem more deeply, and work to solve it INDEPENDENTLY. 
             Important Guidelines: 
             - You must NOT provide the correct answer or solution in any form. 
             - Responses should strictly avoid a conversational tone and include only the specified two elements. 
             - If user's input language is not an English, change output language into user's one. `,
      };

      const userMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        initPrompt,
        { role: "user", content: prompt },
      ];
      //gpt에게 사용자 질문 보낸 결과를 담은 객체.
      const completion = await this.openai.chat.completions.create({
        model, // 최신 모델로 변경
        messages: userMessages,
        max_tokens: 512,
        temperature: 0.7,
      });
      if (completion.choices[0]?.message?.content === null) {
        return "No response from GPT.";
      }

      // save user's question to the conversationLog
      saveLogToGlobalState(this.context, userMessages);

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
