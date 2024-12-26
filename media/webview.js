window.onload = function () {
  const vscode = acquireVsCodeApi();

  // 페이지가 로드될 때 데이터를 업데이트하는 함수
  function updateList(data) {
    const list = document.getElementById("list");
    list.innerHTML = ""; // 기존 리스트를 비우고
    data.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
  }

  window.addEventListener("message", (event) => {
    const message = event.data;
    if (message.command === "setData") {
      updateList(message.data);
    }
  });

  // 버튼 클릭 이벤트 처리
  document.getElementById("send").addEventListener("click", () => {
    const inputElement = document.getElementById("input");
    const inputValue = inputElement.value.trim();

    if (inputValue) {
      // Extension에 데이터 저장 요청
      vscode.postMessage({ command: "save", value: inputValue });

      // 입력 필드 초기화
      inputElement.value = "";
    }
  });
};
