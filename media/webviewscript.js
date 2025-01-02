document.getElementById("toggleNav").addEventListener("click", toggleNav);
document.getElementById("addStep").addEventListener("click", addStep);
document.getElementById("submitButton").addEventListener("click", submitData);
document.getElementById("resetButton").addEventListener("click", resetForm);

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
    toggleNav();
  }

  document.getElementById("problemInput").value = "";
  const stepInputs = document.querySelectorAll(".stepInput");
  stepInputs.forEach((input, index) => {
    if (index === 0) {
      input.value = "";
    } else {
      input.parentElement.remove();
    }
  });

  const outputContent = document.getElementById("outputContent");
  outputContent.innerHTML = "";
}
