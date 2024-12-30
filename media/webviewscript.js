const addStepBtn = document.getElementById("add-step-btn");
const submitBtn = document.getElementById('submit-btn');

let stepCount = 1;

function addNewStep() {
  console.log("함수 실행"); 
  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.placeholder = `Step ${stepCount + 1}`;
  newInput.id = `step-${stepCount + 1}`;
  newInput.className = "step-btn";
  
  const newInputContainer = document.getElementById("input-container");
  newInputContainer.appendChild(newInput); 
  newInput.focus();
  stepCount++;
}

addStepBtn.addEventListener('click', addNewStep);