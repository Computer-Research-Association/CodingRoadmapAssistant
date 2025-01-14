document.getElementById("toggleNav").addEventListener("click", toggleNav);
document.getElementById("addStep").addEventListener("click", addStep);
document.getElementById("deleteStep").addEventListener("click", deleteStep);
document.getElementById("submitButton").addEventListener("click", submitData);
document.getElementById("resetButton").addEventListener("click", resetForm);
document.getElementById("button1").addEventListener("click", () => sendBtnData(1));
document.getElementById("button2").addEventListener("click", () => sendBtnData(2));
document.getElementById("button3").addEventListener("click", () => sendBtnData(3));
const loadingContent = document.getElementById("loadingContent");
const gptOutputContent = document.getElementById("gptOutputContent");
const additionalBtn = document.getElementById("additionalBtn");
const firstResponseContent = document.getElementById("firstResponseContent");
const advancedResponseContent = document.getElementById("advancedResponseContent");
const vscode = acquireVsCodeApi();
let initialResponse = "";
let submitCount = 0;
let gptListenerAdded = false;

function debug(message) {
  vscode.postMessage({
    command: "debug",
    data: message,
  });
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
  userOutputStepBtn.innerHTML = "";
  steps.forEach((userInputStep) => {
    userOutputStepBtn.innerHTML += `<li>${userInputStep}</li>`;
    dataToSend += userInputStepIndex + ". " + userInputStep + " ";
    userInputStepIndex++;
  });
  delete userInputStepIndex; //reset userInputStepIndex number

  submitCount++;

  if (submitCount > 1) {
    clearContent();
  }

  sendData(dataToSend);
  showGptResult();

  toggleNav();

  additionalBtn.style.display = "block";
}

// get gpt's response and show chat-GPT's result to html.
function showGptResult() {
  if (!gptListenerAdded) {
    window.addEventListener("message", (event) => {
      const message = event.data; // get gpt's response
      if (message.command === "setData") {
        const gptOutputContent = document.getElementById("gptOutputContent");

        if (gptOutputContent) {
          loadingContent.classList.add("invisible");
          gptResponse = message.data;

          // If it's the first response, store it and show it along with the user's prompt
          if (initialResponse === "") {
            initialResponse = gptResponse;

            gptOutputContent.classList.remove("invisible");
            firstResponseContent.classList.remove("invisible");
            firstResponseContent.innerHTML += `<h3>GPT's Response</h3><p>${marked.parse(initialResponse)}</p>`;
          } else {
            // If it's not the first response, show it above the previous response

            advancedResponseContent.innerHTML = "";
            advancedResponseContent.classList.remove("invisible");
            advancedResponseContent.innerHTML += `<h3 class="advancedResponse">Advanced questions</h3><p>${marked.parse(gptResponse)}</p>`;
          }

          // Display the buttons again below the responses
          const additionalBtn = document.getElementById("additionalBtn");

          additionalBtn.classList.remove("invisible");
          additionalBtn.style.display = "block";
        }
      } else {
        console.log("message command is not a setData.");
      }
    });
    gptListenerAdded = true;
  } else {
    console.log("gptListenerAdded is already true");
  }
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
  initialResponse = "";
  gptResponse = "";
}

function sendData(data) {
  loadingContent.classList.remove("invisible");
  additionalBtn.classList.add("invisible");
  gptOutputContent.classList.add("invisible");

  vscode.postMessage({
    command: "process",
    value: data,
  });
}
function sendBtnData(buttonNumber) {
  loadingContent.classList.remove("invisible");

  vscode.postMessage({
    command: "button",
    data: initialResponse,
    number: buttonNumber,
  });
}

function addStep() {
  const stepContainer = document.getElementById("steps");
  const stepCount = stepContainer.querySelectorAll(".step").length + 1;
  const newStep = document.createElement("div");
  newStep.classList.add("step", "mb-2");
  newStep.innerHTML = `<input type="text" class="form-control stepInput" placeholder="Step ${stepCount}">`;
  stepContainer.appendChild(newStep);
}

function deleteStep() {
  const stepContainer = document.getElementById("steps");
  const stepCount = stepContainer.querySelectorAll(".step").length;

  if (stepCount > 1) {
    stepContainer.removeChild(stepContainer.lastChild);
  }
}

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

function clearContent() {
  firstResponseContent.innerHTML = "";
  advancedResponseContent.innerHTML = "";
  initialResponse = "";
  gptResponse = "";
}
