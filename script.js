document.addEventListener("DOMContentLoaded", function () {
  let gameActive = true;
  const body = document.body;
  const btn = document.querySelector(".mode-switch");
  btn.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
      btn.textContent = "☀️";
    } else {
      btn.textContent = "🌙";
    }
  });

  function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }

  function updateBoxColor(params) {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((b) => {
      b.style.backgroundColor = getRandomColor();
    });
  }

  function setTargetColor() {
    const boxes = document.querySelectorAll(".box");
    const randomBox = boxes[Math.floor(Math.random() * boxes.length)];
    const TargetColor = randomBox.style.backgroundColor;
    document.querySelector(".target-color").style.backgroundColor = TargetColor;
    return TargetColor;
  }
  let currentTargetColor = " ";
  function updateColorAndTarget() {
    updateBoxColor();
    currentTargetColor = setTargetColor();
  }
  const colorChangeLoop = setInterval(updateColorAndTarget, 3000);

  let score = document.querySelector(".score");
  let count = 0;
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.addEventListener("click", function () {
      let boxColor = box.style.backgroundColor;
      if (gameActive && boxColor == currentTargetColor) {
        count++;
        score.textContent = count;
      }
    });
  });
  let leftTime = 30;
  const countDown = setInterval(() => {
    const time = document.querySelector(".time");
    time.textContent = leftTime;
    if (leftTime == 0) {
      clearInterval(colorChangeLoop);
      clearInterval(countDown);
      gameActive = false;
    }
    leftTime--;
  }, 1000);
});
