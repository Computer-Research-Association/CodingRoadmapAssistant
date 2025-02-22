import * as vscode from "vscode";
import OpenAI from "openai";
import { showApiKeyError, saveLogToGlobalState } from "./craConfigManager";
import { getUri, getNonce } from "./utilities";
import { pickConversationLog } from "./craConfigManager";
import { initialPrompt, additionalPrompt, getTranslatePrompt } from "./source/prompts";

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
      console.log(message);
      switch (message.command) {
        case "initialRequest":
          // 사용자 코드 추가
          let textDoc: vscode.TextDocument | undefined;
          textDoc = vscode.window.activeTextEditor?.document;

          // 문제정의+단계+전체 코드
          const messageToSend = message.value + `\n` + `User's Code: ` + `\n` + (textDoc?.getText() || "");

          //GPT API 호출
          const gptResponse = await this.callGptApi(messageToSend, "initialRequest");
          const finalResult = await this.callGptApi(gptResponse, "translate");

          //웹뷰로 결과 전달
          webviewView.webview.postMessage({
            command: "setGptResponse",
            data: finalResult,
          });
          break;

        case "additional":
          try {
            let textDoc: vscode.TextDocument | undefined;
            textDoc = vscode.window.activeTextEditor?.document;

            // GPT 요청에 사용할 조합된 프롬프트
            const messageToSend =
              `Previous Response: ${message.value}` + `\n` + `User's Code: ` + `\n` + (textDoc?.getText() || "");

            // GPT API 호출
            const gptResponse = await this.callGptApi(messageToSend, "additional");
            const finalResult = await this.callGptApi(gptResponse, "translate");

            // 결과를 웹뷰로 전송
            webviewView.webview.postMessage({
              command: "setGptResponse",
              data: finalResult,
            });
          } catch (error) {
            console.error(`Error processing button:`, error);
            vscode.window.showErrorMessage(`Failed to process button`);
          }
          break;

        case "saveMessageLog":
          saveLogToGlobalState(this.context, message.data);
          break;

        case "history":
          const selectedLog = await pickConversationLog(this.context);
          console.log(selectedLog);
          if (selectedLog) {
            webviewView.webview.postMessage({
              command: "setSelectedLog",
              data: selectedLog,
            });
          }
          break;

        case "language":
          const getLanguage = vscode.workspace.getConfiguration().get<string>("openAI.languageSelected"); //configuration에 저장되있는 model 정보.
          console.log("getLanguage: " + getLanguage);

          if (getLanguage) {
            webviewView.webview.postMessage({
              command: "getLanguage",
              data: selectedLog,
            });
          }
          break;

        case "getInitialOptions":
          const language = vscode.workspace.getConfiguration().get<string>("openAI.languageSelected");
          const model = vscode.workspace.getConfiguration().get<string>("openAI.modelSelected");
          const apiKey = await this.context.secrets.get("OPENAI_API_KEY");

          this.postMessage({
            command: "setInitialOptions",
            data: {
              language,
              gptModel: model,
              apiKey: apiKey,
            },
          });
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

  private async callGptApi(userContent: string, command: string) {
    const model = vscode.workspace.getConfiguration().get<string>("openAI.modelSelected"); //configuration에 저장되있는 model 정보.
    if (!model) {
      return "No model selected. Please configure the OpenAI model.";
    }

    try {
      if (!this.openai) {
        throw new Error();
      }

      let userMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] | undefined;

      switch (command) {
        case "initialRequest":
          const initPrompt: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
            role: "system",
            content: initialPrompt,
          };
          userMessages = [initPrompt, { role: "user", content: userContent }];
          break;

        case "additional":
          const userPrompt: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
            role: "system",
            content: additionalPrompt,
          };

          userMessages = [userPrompt, { role: "user", content: userContent }];
          break;

        case "translate":
          const language = vscode.workspace.getConfiguration().get<string>("openAI.languageSelected");
          const translatePromptContent: string = getTranslatePrompt(language);
          const translatePrompt: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
            role: "system",
            content: translatePromptContent,
          };
          userMessages = [translatePrompt, { role: "user", content: userContent }];
          break;

        default:
          console.log("invalid command: " + command);
      }

      if (!userMessages) return "No message to send GPT";

      const completion = await this.openai.chat.completions.create({
        model, // 최신 모델로 변경
        messages: userMessages,
        max_tokens: 1024,
        temperature: 0.7,
      });

      if (completion.choices[0]?.message?.content === null) {
        return "No response from GPT.";
      }
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
