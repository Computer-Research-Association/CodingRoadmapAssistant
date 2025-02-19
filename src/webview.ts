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

          // 문제정의+단계+전체 코드
          const messageToSend = message.value + `\n` + `User's Code: ` + `\n` + (textDoc?.getText() || "");

          //GPT API 호출
          const gptResponse = await this.callGptApi(messageToSend, "initialRequest");
          //웹뷰로 결과 전달
          webviewView.webview.postMessage({
            command: "setGptResponse",
            data: gptResponse,
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
  private async callGptApi(prompt: string, command: string) {
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
            content: `You are a program to enhance coding skills by helping users identify and address issues in their approach to solving programming problems.
           The user will provide you with three inputs: 
            1. A problem definition.
            2. Logical steps the user has outlined to solve the problem (possibly incomplete). 
            3. The user's attempt at solving the problem in code. 
            Based on these inputs, you must analyze the provided information and respond with only the following element:
            - Exactly three guiding questions that encourage users to reflect on their approach, understand the problem more deeply, and work to solve it INDEPENDENTLY.
            Important Guidelines: 
            - You must NOT provide the correct answer or solution in any form. 
            - Responses should strictly avoid a conversational tone and include only the specified element.
            - Generate a concise response (within two sentences)
            - Here is an example of the expected output based on the given prompt and user input. Generate a response accordingly.
            
            Example Response 1:
            USER INPUT 
            Definition: Given the head of a singly linked list, return true if it is a palindrome or false otherwise.
            Steps:
             1. Traverse the linked list and save the values.
             2. Compare from each end of the values and check whether they are the same; till the end pointers meet in the middle.
             3. if all same, true; if a different value is found, false.
            Code:
             class Solution:
              def isPalindrome(self, head: Optional[ListNode]) -> bool:
                list_vals = []
                while head:
                    list_vals.append(head.val)
                    head = head.next
        
                left, right = 0, len(list_vals)
                while left <= right and list_vals[left] == list_vals[right]:
                    right -= 1
                    left += 1
                return left > right

            GPT RESPONSE
            Response(When user’s input is written in English):
             1. How does initializing right as len(list_vals) instead of len(list_vals) - 1 affect the range of indices being compared?
             2. What happens when left and right are updated inside the loop—does the comparison sequence proceed as expected?
             3. Under what condition should the function return True? Does the current return statement correctly reflect the stopping condition?
             GPT RESPONSE (When user’s input is Korean)
             
            Example Response 2:
            USER INPUT
            Definition: Calculate nth fibonacci number
            Steps:
            1. Enter n, the number of times to be calculated
            2. Create a function that calculates Fibonacci numbers
            3. If the number entered as the function argument is 0, it returns 0; if it is 1, it returns 1 (base case).
            4. Else, return fibo(n-1) + fibo(n-2)
            5. Call the function created in step 2 to find the nth Fibonacci number.
            Code:
            #include <stdio.h> using namespace std;
            int main() { int number = 0; cin << number;
            int result = 0; result = fibo(number); cout >> result >> endl;
            }
            int fibo(int n) { if (n == 0) return 0; else if (n == 1) return 1; else return fibo(n - 1) + fibo(n - 2); }
            GPT RESPONSE (When user’s input is Korean)
            Response:
            1. Will cin << number and cout >> result >> endl work properly? (Correct usage of >> and << operators)
            2. In my current code, the fibo function declaration is under main. Will this cause a problem?
            3. Is it possible to compute the same Fibonacci value multiple times due to recursive calls? (Memoization)
            
            Example Response 3:
            USER INPUT
            Step:
            step 1. Enter text and save it.
            step 2. Compare characters to check which characters are the same
            step 3. The same part is printed as is, and the other part is replaced with the ? character.
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
            1. When comparing strings, how can I implement a character-by-character comparison of each word?
            2. When printing the same part as it is and changing other parts to ?, what strategy is needed to minimize the number of '?'?
            3. If the file names are all the same, how can I print the originals without printing the '?'?        
             `,
          };
          userMessages = [initPrompt, { role: "user", content: prompt }];
          break;

        case "additional":
          const userPrompt: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
            role: "system",
            content: `You are an expert coding assistant helping users solve programming problems. 
            The User has encountered a difficulty and provided the problem definition, their planned steps, and code.
            You previously gave three guiding questions to help them proceed. Now, the User has follow-up questions.
            Respond concisely in no more than two sentences, providing a clear and specific answer.
            Ensure your response directly addresses the User’s question with relevant details.
            Do not include the Explanation of Inconsistencies section. `,
          };

          userMessages = [userPrompt, { role: "user", content: prompt }];
          break;

        default:
          console.log("invalid command: " + command);
      }

      if (!userMessages) return "No message to send GPT";

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
