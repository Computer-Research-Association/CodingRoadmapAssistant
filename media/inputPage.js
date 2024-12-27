(function () {
  console.log("js 실행 완.");
  // const inputContainer = document.getElementById('input-container');
  // let isComposing = false; // IME 활성화 상태 확인 변수
  // // IME가 시작될 때 호출
  // function handleCompositionStart() {
  //   isComposing = true;
  // }
  // // IME가 종료될 때 호출
  // function handleCompositionEnd() {
  //   isComposing = false;
  // }
  // // 키다운 이벤트 처리
  // function handleKeyDown(event, index) {
  //   if (isComposing) return; // IME 활성화 상태에서는 무시
  //   if (event.key === 'Enter' && event.target.value.trim() !== '') {
  //     event.preventDefault(); // 기본 Enter 동작 방지
  //     addNewInput(index);
  //   }
  // }

  //새로운 step btn 넣을 container
  const newInputContainer = document.getElementById("input-container");
  //add button. click여부 확인위해 사용
  const addStepButton = document.getElementById("add-step-btn");
  let stepCount = 1; //현재 입력 필드 개수

  // 새로운 입력 필드 추가
  function addNewInput() {
    console.log("함수 실행");
    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.placeholder = `Step ${stepCount + 1}`;
    newInput.id = `step-${stepCount + 1}`;
    newInput.className = "step-btn";
    newInputContainer.appendChild(newInput);
    newInput.focus();
    stepCount++;

    console.log("add 누르기 완료. 카운트 수: " + stepCount);
  }

  // 초기 입력 필드에 이벤트 추가. (위에서 가져온 add 버튼에 이벤트리스너 추가)
  addStepButton.addEventListener("click", addNewInput);
  console.log("이벤트 리스너 추가 완.");
})();
