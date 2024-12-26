// 페이지 로드 시 저장된 데이터 표시
window.onload = function () {
  const list = document.getElementById("list");

  // 초기 데이터 추가
  if (typeof initialData !== "undefined") {
    initialData.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
  }

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
