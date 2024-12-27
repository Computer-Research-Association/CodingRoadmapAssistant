const vscode = acquireVsCodeApi();

window.onload = function () {
  function updateList(data, isUserMessage) {
    const list = document.getElementById("list");
    const li = document.createElement("li");
    li.textContent = data;

    if (isUserMessage) {
      li.style.fontWeight = "bold"; // 사용자 메시지 굵게 표시
    }

    list.appendChild(li);

    // 대화 내용이 추가된 후 가장 최신 메시지로 스크롤
    list.scrollTop = list.scrollHeight;
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
      updateList(inputValue, true); // 사용자의 메시지
      vscode.postMessage({ command: "process", value: inputValue });
      inputElement.value = ""; // 입력 필드 비우기
    }
  });

  document.getElementById("reset").addEventListener("click", () => {
    const list = document.getElementById("list");
    list.innerHTML = ""; // 모든 대화 내용 지우기
  });
};
