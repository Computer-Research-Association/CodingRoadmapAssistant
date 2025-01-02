import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export async function setAPIKey(context: vscode.ExtensionContext) {
  const inputBoxOptions: vscode.InputBoxOptions = {
    prompt: "Enter your OpenAI API key.",
    ignoreFocusOut: true,
    placeHolder: "Open API Key",
    password: true,
  };

  const apiKey = await vscode.window.showInputBox(inputBoxOptions);

  if (!apiKey) {
    vscode.window.showWarningMessage("No API key entered.");
    return "";
  }

  await context.secrets.store("OPENAI_API_KEY", apiKey);
  // context에서 제공하는 secretStorage를 사용하여 api key 를 저장하는 방법

  await vscode.workspace.getConfiguration().update("openAI.apiKey", apiKey, vscode.ConfigurationTarget.Global);
  vscode.window.showInformationMessage("Open AI API key saved successfully.");
  return apiKey;
}

export async function showModelSelectionQuickPick() {
  await vscode.window.showQuickPick(["gpt-4o", "gpt-4o-mini", "o1", "gpt-3.5-turbo"], {
    placeHolder: "Select GPT Model",
    async onDidSelectItem(item) {
      await vscode.workspace.getConfiguration().update("openAI.modelSelected", item, vscode.ConfigurationTarget.Global);
    },
  });
}

export async function initConversationLogFile(context: vscode.ExtensionContext) {
  let workspacePath = "";

  try {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    //workdpace folder check, path 생성
    if (workspaceFolders && workspaceFolders.length > 0) {
      workspacePath = workspaceFolders[0].uri.fsPath; // 한 개의 워크스페이스 경로만 가져옴(추후 여러 개의 경로 구현 필요.)
      console.log("workspace folder exist! " + `workspace path: ${workspacePath}`);
    } else {
      console.log("no workspace Folder exist");
    }
    fs.mkdir(workspacePath + "/out", (err) => console.log(err)); //폴더 만들기

    const data = [
      {
        role: "system",
        content:
          "You are my coding assistant to enhance my coding skills. From now on, i’ll give you some coding problem and user’s attempt to solve it. Also you may be given logical steps of the user’s code.",
      },
      {
        role: "system",
        content:
          "Generate the output that includes the following points. 1. Never give the answer. Including code. 2. tutor him. must ask questions. make sure the user understands it themselves. 3. for each logical step, provide three questions made in step 2. number each question 1, 2, 3 for each logical step. ",
      },
    ];
  } catch {
    console.log("Error happened at making files : ");
    throw new Error();
  }
}
