import * as vscode from "vscode";
import OpenAI from "openai";
import { showApiKeyError, saveLogToGlobalState } from "./craConfigManager";
import { getUri, getNonce } from "./utilities";
import { pickConversationLog } from "./craConfigManager";

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
        case "initialRequest":
          // 사용자 코드 추가
          let textDoc: vscode.TextDocument | undefined;

          textDoc = vscode.window.activeTextEditor?.document;
          console.log(textDoc?.getText());

          // 문제정의+단계+전체 코드
          const messageToSend = message.value + "User's Code: " + (textDoc?.getText() || "");

          //GPT API 호출
          const gptResponse = await this.callGptApi(messageToSend);
          //웹뷰로 결과 전달
          webviewView.webview.postMessage({
            command: "setGptResponse",
            data: gptResponse,
          });
          break;

        case "button":
          try {
            // 사용자가 버튼 클릭 시 전달한 데이터 (기존 GPT 응답)
            const previousResponse = message.data;
            const userPrompt = `Read the response you gave, find out what the three guiding questions were, and explain in detail the guiding question. 
            Do not include the Explanation of Inconsistencies section. Only find the three from the guiding questions, and explain the question.`;

            // GPT 요청에 사용할 조합된 프롬프트
            const combinedPrompt = `${userPrompt}\n\nPrevious Response:\n${previousResponse}`;

            // GPT API 호출
            const gptResponse = await this.callGptApi(combinedPrompt);

            // 결과를 웹뷰로 전송
            webviewView.webview.postMessage({
              command: "setGptResponse",
              data: gptResponse,
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
          console.log("1");
          const selectedLog = await pickConversationLog(this.context);
          console.log(selectedLog);
          if (selectedLog) {
            webviewView.webview.postMessage({
              command: "setSelectedLog",
              data: selectedLog,
            });
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
           From now on, I will provide you with three inputs: 
            1. A problem definition.
            2. Logical steps the user has outlined to solve the problem (possibly incomplete). 
            3. The user's attempt at solving the problem in code. 
           Based on these inputs, you must analyze the provided information and respond with only the following two elements
           : Exactly three guiding questions that encourage users to reflect on their approach, understand the problem more deeply, and work to solve it INDEPENDENTLY. 
             Important Guidelines: 
             - You must NOT provide the correct answer or solution in any form. 
             - Responses should strictly avoid a conversational tone and include only the specified two elements. 
             - If user's input language is not an English, change output language into user's one.,
             - Provide a two-sentence summary instead of the first results of gpt. 
             
            GPT RESPONSE
            Response:
             1. How does initializing right as len(list_vals) instead of len(list_vals) - 1 affect the range of indices being compared?
             2. What happens when left and right are updated inside the loop—does the comparison sequence proceed as expected?
             3. Under what condition should the function return True? Does the current return statement correctly reflect the stopping condition?
             GPT RESPONSE (When user’s input is Korean)

            Response: 
              1. Is the rightmost index of the list len(list_vals) or len(list_vals) - 1?
              2. Should we compare until the left pointer and the right pointer become equal?
              3. If the two values ​​are different, shouldn't it immediately return false?
             
            Example Response 2:
            USER INPUT
            Definition: Calculate nth fibonacci number
            Steps:
            1. Enter n, the number of times to be calculated
            2. Create a function that calculates Fibonacci numbers
            3. If the number entered as the function argument is 0, it returns 0; if it is 1, it returns 1 (base case).
            4. Else, return fibo(n-1) + fibo(n-2)
            5. Find the nth Fibonacci number you want by calling the function created in step 2.
            Code:
            #include <stdio.h> using namespace std;
            int main() { int number = 0; cin << number;
            int result = 0; result = fibo(number); cout >> result >> endl;
            }
            int fibo(int n) { if (n == 0) return 0; else if (n == 1) return 1; else return fibo(n - 1) + fibo(n - 2); }
            GPT RESPONSE (When user’s input is Korean)
            Response:
            1. Will cin << number and cout >> result >> endl work properly? (Correct usage of >> and << operators)
            2. In your current code, the fibo function declaration is under main. Will this cause a problem?
            3. Is it possible to compute the same Fibonacci value multiple times due to recursive calls? (Memoization)
            USER INPUT
            Step:
            step 1. Enter text and save it.
            step 2. Compare characters to check which characters are the same
            step 3. The same parts are output as is, and different parts are replaced with ?.
            Code:
            #include <stdio.h>
            #include <stdlib.h>
            #include <string.h>

            int main(){
                int n = 0;
                scanf("%d", &n);
                char a[n][50];
                for(int i = 0; i < n; i++){
                    scanf("%s", a[i]);
                }
                for(int i = 0; i < n; i++){
                    str
                }
            }
            GPT RESPONSE (When user’s input is Korean)
            Response:
            1. When comparing strings, how can I implement a character-by-character comparison for each file?
            2. When printing the same part as it is and changing other parts to '?', what strategy is needed to minimize the number of '?'?
            3. If the file names are all the same, how can I print the originals without printing the '?'?           
             `,
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
