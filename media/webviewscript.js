document.getElementById("toggleNav").addEventListener("click", toggleNav);
document.getElementById("addStep").addEventListener("click", addStep);
document.getElementById("submitButton").addEventListener("click", submitData);
document.getElementById("resetButton").addEventListener("click", resetForm);

function toggleNav() {
  const inputSection = document.getElementById("inputSection");
  const outputSection = document.getElementById("outputSection");
  const toggleNavButton = document.getElementById("toggleNav");

  if (inputSection.style.maxHeight === "0px") {
    inputSection.style.maxHeight = "100vh";
    inputSection.style.opacity = "1";
    outputSection.style.height = "0";
    outputSection.style.opacity = "0";
    toggleNavButton.textContent = "▼";
  } else {
    inputSection.style.maxHeight = "0";
    inputSection.style.opacity = "0";
    outputSection.style.height = "100%";
    outputSection.style.opacity = "1";
    toggleNavButton.textContent = "▲";
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

  stepInputs.forEach((input) => {
    steps.push(input.value);
  });

  const outputContent = document.getElementById("outputContent");
  outputContent.innerHTML = `<h3>Problem Definition:</h3><p>${problemInput}</p><h3>Steps:</h3><ul>`;

  steps.forEach((step) => {
    outputContent.innerHTML += `<li>${step}</li>`;
  });

  outputContent.innerHTML += `</ul>`;
  toggleNav();
}

function resetForm() {
  const inputSection = document.getElementById("inputSection");
  if (inputSection.style.maxHeight === "0px") {
    toggleNav(); // 펼쳐진 상태로 만듦
  }

  document.getElementById("problemInput").value = "";
  const stepInputs = document.querySelectorAll(".stepInput");
  stepInputs.forEach((input, index) => {
    if (index === 0) {
      input.value = ""; // 첫 번째 Step은 남김
    } else {
      input.parentElement.remove(); // 나머지 Step 삭제
    }
  });

  const outputContent = document.getElementById("outputContent");
  outputContent.innerHTML = "";
}
