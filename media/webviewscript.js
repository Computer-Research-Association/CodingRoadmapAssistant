document.getElementById("toggleNav").addEventListener("click", toggleNav);
document.getElementById("addStep").addEventListener("click", addStep);
document.getElementById("delateStep").addEventListener("click", delateStep);
document.getElementById("submitButton").addEventListener("click", submitData);
const firstResponseContent = document.getElementById("firstResponseContent");
const advancedResponseContent = document.getElementById("advancedResponseContent");
document.getElementById("resetButton").addEventListener("click", resetForm);
document.getElementById("button1").addEventListener("click", () => {
  vscode.postMessage({
    command: "button1",
    data: initialResponse,
  });

  // 새 응답을 위에 출력하고 기존 응답은 아래에 계속 유지
  const gptOutputContent = document.getElementById("gptOutputContent");

  // 버튼 3개 다시 보이게 하기
  const additionalBtn = document.getElementById("additionalBtn");
  if (additionalBtn) {
    additionalBtn.classList.remove("invisible");
    additionalBtn.style.display = "block";
  }
});

// 버튼 2 클릭 시: 새 응답을 출력하고 기존 응답을 아래에 출력
document.getElementById("button2").addEventListener("click", () => {
  vscode.postMessage({
    command: "button2",
    data: initialResponse,
  });

  // 새 응답을 위에 출력하고 기존 응답은 아래에 계속 유지
  const gptOutputContent = document.getElementById("gptOutputContent");

  // 버튼 3개 다시 보이게 하기
  const additionalBtn = document.getElementById("additionalBtn");
  if (additionalBtn) {
    additionalBtn.classList.remove("invisible");
    additionalBtn.style.display = "block";
  }
});

// 버튼 3 클릭 시: 새 응답을 출력하고 기존 응답을 아래에 출력
document.getElementById("button3").addEventListener("click", () => {
  vscode.postMessage({
    command: "button3",
    data: initialResponse,
  });

  // 새 응답을 위에 출력하고 기존 응답은 아래에 계속 유지
  const gptOutputContent = document.getElementById("gptOutputContent");

  // 버튼 3개 다시 보이게 하기
  const additionalBtn = document.getElementById("additionalBtn");
  if (additionalBtn) {
    additionalBtn.classList.remove("invisible");
    additionalBtn.style.display = "block";
  }
});

let initialResponse = ""; // 첫 번째 GPT 응답을 저장할 변수
let userPrompt = ""; // 사용자 프롬프트 저장 변수

const vscode = acquireVsCodeApi(); // webview.ts 와 정보 주고받기

function toggleNav() {
  const inputSection = document.getElementById("inputSection");
  const outputSection = document.getElementById("outputSection");
  const toggleNavButton = document.getElementById("toggleNav");

  toggleNavButton.textContent = "";

  if (inputSection.style.maxHeight === "0px") {
    inputSection.style.maxHeight = "100vh";
    inputSection.style.opacity = "1";
    outputSection.style.height = "0";
    outputSection.style.opacity = "0";
  } else {
    inputSection.style.maxHeight = "0";
    inputSection.style.opacity = "0";
    outputSection.style.height = "100%";
    outputSection.style.opacity = "1";
  }
}

function addStep() {
  const stepContainer = document.getElementById("steps");
  const stepCount = stepContainer.querySelectorAll(".step").length + 1;
  const newStep = document.createElement("div");
  newStep.classList.add("step", "mb-2");
  newStep.innerHTML = `<input type="text" class="form-control stepInput" placeholder="Step ${stepCount}">`;
  stepContainer.appendChild(newStep);
}

function delateStep() {
  const stepContainer = document.getElementById("steps");
  const stepCount = stepContainer.querySelectorAll(".step").length;

  if (stepCount > 1) {
    stepContainer.removeChild(stepContainer.lastChild);
  }
}

function submitData() {
  const problemInput = document.getElementById("problemInput").value;
  const stepInputs = document.querySelectorAll(".stepInput");
  const steps = [];

  if (problemInput.trim() === "") {
    const alertDiv = document.getElementById("alertMessage");
    alertDiv.style.display = "block";
    setTimeout(() => {
      alertDiv.style.display = "none";
    }, 1000);
    return;
  }

  stepInputs.forEach((input) => {
    steps.push(input.value);
  });

  const userOutputProbBtn = document.getElementById("userOutputProbBtn");
  const userOutputStepBtn = document.getElementById("userOutputStepBtn");
  userOutputProbBtn.innerHTML = `<p>${problemInput}</p>`;
  let dataToSend = "problem definition: " + problemInput + ", steps: "; // save data to send to Chat-GPT

  let userInputStepIndex = 1;
  steps.forEach((userInputStep) => {
    userOutputStepBtn.innerHTML += `<li>${userInputStep}</li>`;
    dataToSend += userInputStepIndex + ". " + userInputStep + " ";
    userInputStepIndex++;
  });
  delete userInputStepIndex; //reset userInputStepIndex number

  sendData(dataToSend); // send data into webview.ts

  showGptResult(); // get gpt's response and show chat-GPT's result to html.

  toggleNav();

  const additionalBtn = document.getElementById("additionalBtn");
  if (additionalBtn) {
    additionalBtn.style.display = "block";
  }
}

// send data into webview.ts
function sendData(data) {
  vscode.postMessage({
    command: "process",
    value: data,
  });
}

// get gpt's response and show chat-GPT's result to html.
function showGptResult() {
  window.addEventListener("message", (event) => {
    const message = event.data; // get gpt's response

    if (message.command === "setData") {
      const gptOutputContent = document.getElementById("gptOutputContent");

      if (gptOutputContent) {
        gptResponse = message.data;

        // If it's the first response, store it and show it along with the user's prompt
        if (initialResponse === "") {
          initialResponse = gptResponse;

          firstResponseContent.classList.remove("invisible");
          firstResponseContent.innerHTML += `<p>${marked.parse(initialResponse)}</p>`;
        } else {
          // If it's not the first response, show it above the previous response
          advancedResponseContent.innerHTML = "";
          advancedResponseContent.classList.remove("invisible");
          advancedResponseContent.innerHTML += `<p>${marked.parse(gptResponse)}</p>`;
        }

        // Display the buttons again below the responses
        const additionalBtn = document.getElementById("additionalBtn");
        if (additionalBtn) {
          additionalBtn.classList.remove("invisible");
          additionalBtn.style.display = "block";
        }
      } else {
        alert("No response from Chat-GPT.");
      }
    }
  });
  // Remove existing event listener to avoid duplication
  window.removeEventListener("message", messageHandler);
  // Add the new event listener
  window.addEventListener("message", messageHandler);
}

function resetForm() {
  const inputSection = document.getElementById("inputSection");
  const additionalBtn = document.getElementById("additionalBtn");

  // Ensure input section is visible
  if (inputSection.style.maxHeight === "0px") {
    toggleNav();
  }

  // Clear problem input
  document.getElementById("problemInput").value = "";

  // Reset step inputs
  const stepInputs = document.querySelectorAll(".stepInput");
  stepInputs.forEach((input, index) => {
    if (index === 0) {
      input.value = ""; // Reset the first step input
    } else {
      input.parentElement.remove(); // Remove additional steps
    }
  });

  // Clear user output content
  document.getElementById("userOutputProbBtn").innerHTML = "";
  document.getElementById("userOutputStepBtn").innerHTML = "";

  // Reset GPT output content
  document.getElementById("firstResponseContent").innerHTML = "";
  document.getElementById("advancedResponseContent").innerHTML = "";

  // Hide additional buttons
  if (additionalBtn) {
    additionalBtn.classList.add("invisible");
    additionalBtn.style.display = "none";
  }

  // Reset stored responses
  initialResponse = ""; // 초기 응답 초기화
  userPrompt = ""; // 사용자 프롬프트 초기화
  gptResponse = ""; // 현재 GPT 응답 초기화
  showGptResult();
}
