document.getElementById("toggleNav").addEventListener("click", toggleNav);
document.getElementById("addStep").addEventListener("click", addStep);
document.getElementById("delateStep").addEventListener("click", delateStep);
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

        const additionalBtn = document.getElementById("additionalBtn");
        if (additionalBtn) {
          additionalBtn.classList.remove("invisible");
        }
      } else {
        alert("No response from Chat-GPT.");
      }
    }
  });
}

function resetForm() {
  const inputSection = document.getElementById("inputSection");
  if (inputSection.style.maxHeight === "0px") {
    toggleNav(); // Ensure input section is visible
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
  const gptOutputContent = document.getElementById("gptOutputContent");
  if (gptOutputContent) {
    gptOutputContent.innerHTML = "";
  }

  // Hide additional buttons
  const additionalBtn = document.getElementById("additionalBtn");
  if (additionalBtn) {
    additionalBtn.style.display = "none";
  }
}
