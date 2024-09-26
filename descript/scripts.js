// scripts.js 파일

// 모달 요소 찾기
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeModal = document.querySelector(".close");

// 연산자 카드를 클릭했을 때 모달을 표시하는 함수
document.querySelectorAll(".operator").forEach(operator => {
  operator.addEventListener("click", function () {
    const imageSrc = this.getAttribute("data-image"); // data-image 속성에서 이미지 경로 가져오기
    if (imageSrc) {
      modalImg.src = imageSrc; // 모달에 이미지 설정
      modal.style.display = "block"; // 모달 보이기
    }
  });
});

// 모달 닫기 버튼 (x)를 클릭하면 모달을 숨기는 함수
closeModal.addEventListener("click", function () {
  modal.style.display = "none"; // 모달 숨기기
});

// 모달 외부를 클릭하면 모달을 숨기는 함수
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none"; // 모달 숨기기
  }
});
