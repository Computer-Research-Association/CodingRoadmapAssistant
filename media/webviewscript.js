const vscode = acquireVsCodeApi();

window.onload = function () {
  function updateList(data, isUserMessage) {
    const list = document.getElementById("list");
    const messageDiv = document.createElement("div");
    messageDiv.textContent = data;

    if (isUserMessage) {
      messageDiv.classList.add("message", "user");
    } else {
      messageDiv.classList.add("message", "gpt");
    }

    list.appendChild(messageDiv);
    list.scrollTop = list.scrollHeight;
  }

  window.addEventListener("message", (event) => {
    const message = event.data;
    if (message.command === "setData") {
      updateList(message.data, false);
    }
  });

  document.getElementById("send").addEventListener("click", () => {
    const inputElement = document.getElementById("input");
    const inputValue = inputElement.value.trim();

    if (inputValue) {
      updateList(inputValue, true);
      vscode.postMessage({ command: "process", value: inputValue });
      inputElement.value = "";
    }
  });

  document.getElementById("reset").addEventListener("click", () => {
    const list = document.getElementById("list");
    list.innerHTML = "";
  });
};