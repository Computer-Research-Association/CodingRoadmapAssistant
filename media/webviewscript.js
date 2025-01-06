document.getElementById("toggleNav").addEventListener("click", toggleNav);
document.getElementById("addStep").addEventListener("click", addStep);
document.getElementById("submitButton").addEventListener("click", submitData);
document.getElementById("resetButton").addEventListener("click", resetForm);
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

  const userOutputContent = document.getElementById("userOutputContent");
  userOutputContent.innerHTML = `<h3>Problem Definition:</h3><p>${problemInput}</p><h3>Steps:</h3><ul>`;
  let dataToSend = "problem definition: " + problemInput + ", steps: "; // save data to send to Chat-GPT

  let userInputStepIndex = 1;
  steps.forEach((userInputStep) => {
    userOutputContent.innerHTML += `<li>${userInputStep}</li>`;
    dataToSend += userInputStepIndex + ". " + userInputStep;
    userInputStepIndex++;
  });
  delete userInputStepIndex; //reset userInputStepIndex number

  sendData(dataToSend); // send data into webview.ts
  userOutputContent.innerHTML += `</ul>`;

  showGptResult(); // get gpt's response and show chat-GPT's result to html.

  toggleNav();
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
        gptOutputContent.innerHTML = `<h3>GPT Response:</h3><p>${marked.parse(message.data)}</p>`; // show chat-GPT's result to html.
      } else alert("No response from Chat-GPT.");
    }
  });
}

function resetForm() {
  const inputSection = document.getElementById("inputSection");
  if (inputSection.style.maxHeight === "0px") {
    toggleNav();
  }

  document.getElementById("problemInput").value = "";
  const stepInputs = document.querySelectorAll(".stepInput");
  stepInputs.forEach((input, userInputStepIndex) => {
    if (userInputStepIndex === 0) {
      input.value = "";
    } else {
      input.parentElement.remove();
    }
  });

  const userOutputContent = document.getElementById("userOutputContent");
  userOutputContent.innerHTML = "";
}
