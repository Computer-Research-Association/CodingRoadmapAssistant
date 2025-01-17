import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import OpenAI from "openai";
import { showApiKeyError, saveLogToGlobalState, pickOpenedDocument } from "./craConfigManager";
import { getUri, getNonce } from "./utilities";

export default class CRAWebviewViewProvider implements vscode.WebviewViewProvider {
  private apiKey?: string;
  private context: vscode.ExtensionContext;
  private openai?: OpenAI;
  private webview?: vscode.Webview;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.getApiKey();
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this.webview = webviewView.webview;
    // 웹뷰의 옵션에 localResourceRoots를 설정
    webviewView.webview.options = {
      enableScripts: true, // 자바스크립트 활성화
      localResourceRoots: [
        vscode.Uri.joinPath(this.context.extensionUri, "out"),
        vscode.Uri.joinPath(this.context.extensionUri, "webview-ui/build"),
      ],
    };

    //웹뷰 HTML 설정
    webviewView.webview.html = this._getWebviewContent(webviewView.webview, this.context.extensionUri);

    webviewView.webview.onDidReceiveMessage(async (message) => {
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
        case "button":
          const btnNumber = message.number;
          try {
            // 사용자가 버튼 클릭 시 전달한 데이터 (기존 GPT 응답)
            const previousResponse = message.data;
            const userPrompt = `Read the response you gave, find out what the three guiding questions were, and explain in detail the guiding question number ${btnNumber}. 
            Do not include the Explanation of Inconsistencies section. Only find the three from the guiding questions, and explain the question number ${btnNumber}.`;

            // GPT 요청에 사용할 조합된 프롬프트
            const combinedPrompt = `${userPrompt}\n\nPrevious Response:\n${previousResponse}`;

            // GPT API 호출
            const gptResponse = await this.callGptApi(combinedPrompt);

            // 결과를 웹뷰로 전송
            webviewView.webview.postMessage({
              command: "setData",
              data: gptResponse,
            });

            // 로그 저장 (선택적)
            const gptData = [{ role: "system", content: gptResponse }];
            saveLogToGlobalState(this.context, gptData);
          } catch (error) {
            console.error(`Error processing button ${btnNumber} click:`, error);
            vscode.window.showErrorMessage(`Failed to process button ${btnNumber} click.`);
          }
          break;

        case "debug":
          console.log(message.data);
      }
    });
  }

  public postMessage(message: unknown) {
    if (this.webview) {
      this.webview.postMessage(message);
    }
  }

  private _getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
    const stylesUri = getUri(webview, extensionUri, ["webview-ui", "build", "assets", "index.css"]);
    const scriptUri = getUri(webview, extensionUri, ["webview-ui", "build", "assets", "index.js"]);
    const nonce = getNonce();

    return /*HTML*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
          <title>VSCode React</title>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>
    `;
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
          If user's input language is NOT an English(cf. Korean), CHANGE GPT's output language into user's one. 
           From now on, I will provide you with three inputs: 
            1. A problem definition.
            2. Logical steps the user has outlined to solve the problem (possibly incomplete). 
            3.The user's attempt at solving the problem in code. 
           Based on these inputs, you must analyze the provided information and respond with only the following two elements
           : 1. An explanation of any inconsistencies between the problem definition, the logical steps, and the code provided. Highlight potential issues or misalignments.
             2. Exactly three guiding questions that encourage users to reflect on their approach, understand the problem more deeply, and work to solve it INDEPENDENTLY. 
             Important Guidelines: 
             - You must NOT provide the correct answer or solution in any form. 
             - Responses should strictly avoid a conversational tone and include only the specified two elements. 
             - If user's input language is not an English, change output language into user's one.,
             - Provide a two-sentence summary instead of the first results of gpt. `,
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

  public getWebview() {
    return this.webview;
  }
}
