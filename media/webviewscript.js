const addStepButton = document.getElementById("add-step-btn");
const submitButton = document.getElementById("submit-btn");
const resetButton = document.getElementById("reset-btn");

let stepCounter = 1;
let isNavbarHidden = false;

function resetBtn() {
  document.querySelector(".definition-input").value = "";

  const inputContainer = document.getElementById("input-container");
  inputContainer.innerHTML = "";
  const firstStepInput = document.getElementById("step-0");
  firstStepInput.value = "";
  stepCounter = 1;

  const testOutput = document.getElementById("test-output");
  testOutput.innerHTML = "";

  const navbarContent = document.getElementById("navbar-content");
  navbarContent.style.display = "block";
  navbarContent.style.maxHeight = navbarContent.scrollHeight + "px";
  isNavbarHidden = false;
}

function createNewStepInput() {
  console.log("Adding new step");
  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.placeholder = `Step ${stepCounter + 1}`;
  newInput.id = `step-${stepCounter + 1}`;
  newInput.className = "input-field step-input mb-3";

  const inputContainer = document.getElementById("input-container");
  inputContainer.appendChild(newInput);
  newInput.focus();
  stepCounter++;
}

function toggleNavbarShowHide() {
  const navbarContent = document.getElementById("navbar-content");
  if (isNavbarHidden) {
    navbarContent.style.display = "block";
    requestAnimationFrame(() => {
      navbarContent.style.maxHeight = navbarContent.scrollHeight + "px";
    });
  } else {
    navbarContent.style.maxHeight = "0";
    navbarContent.addEventListener(
      "transitionend",
      () => {
        if (isNavbarHidden) navbarContent.style.display = "none";
      },
      { once: true }
    );
  }
  isNavbarHidden = !isNavbarHidden;
}

function submitData() {
  const problemDefinition = document.querySelector(".definition-input").value;
  const steps = Array.from(document.querySelectorAll(".step-input")).map((input) => input.value);

  newOutput(problemDefinition, steps);

  toggleNavbarShowHide();
}

function newOutput(definition, steps) {
  const testOutput = document.getElementById("test-output");
  testOutput.innerHTML = `
    <h3>Result:</h3>
    <p><strong>Problem Definition:</strong> ${definition}</p>
    <ul>${steps.map((step) => `<li>${step}</li>`).join("")}</ul>
  `;
}

addStepButton.addEventListener("click", createNewStepInput);
submitButton.addEventListener("click", submitData);
resetButton.addEventListener("click", resetBtn);

document.querySelector(".navbar-toggler").addEventListener("click", toggleNavbarShowHide);
