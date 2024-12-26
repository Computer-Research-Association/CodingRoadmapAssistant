const vscode = acquireVsCodeApi();

window.onload = function () {
  function updateList(data) {
    const list = document.getElementById("list");
    list.innerHTML = ""; // 기존 리스트를 비우고
    const li = document.createElement("li");
    li.textContent = data;
    list.appendChild(li);
  }

  window.addEventListener("message", (event) => {
    const message = event.data;
    if (message.command === "setData") {
      updateList(message.data);
    }
  });

  document.getElementById("send").addEventListener("click", () => {
    const inputElement = document.getElementById("input");
    const inputValue = inputElement.value.trim();

    if (inputValue) {
      vscode.postMessage({ command: "process", value: inputValue });
      inputElement.value = "";
    }
  });
};
