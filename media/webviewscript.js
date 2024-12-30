const addStepButton = document.getElementById("add-step-btn");
const submitButton = document.getElementById('submit-btn');

let stepCounter = 1;

function addNewStep() {
  console.log("Adding new step"); 
  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.placeholder = `Step ${stepCounter + 1}`;
  newInput.id = `step-${stepCounter + 1}`;
  newInput.className = "input-field step-input";
  
  const inputContainer = document.getElementById("input-container");
  inputContainer.appendChild(newInput); 
  newInput.focus();
  stepCounter++;
}

function saveData(){
  const definition = document.querySelector(".definition-input").value;
  const steps = [];

  const stepInputs = document.querySelectorAll('.step-input');
  stepInputs.forEach(input => {
    steps.push(input.value);
  });

  console.log("Definition:", definition);
  console.log("Steps:", steps);
}

addStepButton.addEventListener('click', addNewStep);
submitButton.addEventListener('click', saveData);