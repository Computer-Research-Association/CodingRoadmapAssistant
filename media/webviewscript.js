const addStepButton = document.getElementById("add-step-btn");
const submitButton = document.getElementById("submit-btn");
const resetButton = document.getElementById("reset-btn");

let stepCounter = 1;

function resetBtn(){
  document.querySelector('.definition-input').value = '';  // 문제 정의 입력 필드 초기화
  const stepInputs = document.querySelectorAll(".step-input");
  stepInputs.forEach(input => input.remove());  // 모든 step 입력 필드 삭제
  const testOutput = document.getElementById("test-output");
  testOutput.innerHTML = '';  // 출력 영역 초기화
  toggleNavbarShowHide();  // 네비게이션 바 접기/펼치기 상태로 초기화
}

function createNewStepInput() {
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

function toggleNavbarShowHide() {
  const navbarContent = document.getElementById("navbar-content");

  if (navbarContent.classList.contains("hidden")) {
    navbarContent.classList.remove("hidden");
    navbarContent.style.maxHeight = navbarContent.scrollHeight + "px";
  } else {
    navbarContent.style.maxHeight = "0";
    navbarContent.classList.add("hidden");
  }
}

function addData() {
  const problemDefinition = document.querySelector(".definition-input").value;
  const steps = [];

  const stepInputs = document.querySelectorAll(".step-input");
  stepInputs.forEach(input => {
    steps.push(input.value);
  });

  console.log("Problem Definition:", problemDefinition);
  console.log("Steps:", steps);

  newOutput(problemDefinition, steps);
}

function newOutput(definition, steps) {
  const testOutput = document.getElementById("test-output");
  testOutput.innerHTML = `
    <h3>Result:</h3>
    <p><strong>Problem Definition:</strong> ${definition}</p>
    <ul>${steps.map(step => `<li>${step}</li>`).join("")}</ul>
  `;

  testOutput.style.color = "green";
  testOutput.style.fontSize = "16px";
  testOutput.style.marginTop = "20px";
  testOutput.style.padding = "10px";
}

addStepButton.addEventListener("click", createNewStepInput);
submitButton.addEventListener("click", function () {
  addData();
  toggleNavbarShowHide();
});
resetButton.addEventListener("click", resetBtn);  // 함수 자체를 전달