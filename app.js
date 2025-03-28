const h2 = document.querySelector("h2");
const allBtns = document.querySelectorAll(".btns");
const score = document.querySelector(".score");

let btns = ["red", "blue", "yellow", "green"];
let gameSequence = [];
let userSequence = [];
let level = 0;
let gameStarted = false;

document.addEventListener("keydown", (evt) => {
    if (!gameStarted && evt.code === "KeyS") { 
        gameStarted = true;
        level = 0;
        gameSequence = [];
        h2.innerText = "Game Started!";
        levelUp();
    }
});


for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 300);
}

function levelUp() {
  userSequence = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randomIdx = Math.floor(Math.random() * 4);
  let randomColor = btns[randomIdx];
  let randomBtn = document.querySelector(`.${randomColor}`);

  gameSequence.push(randomColor);
  btnFlash(randomBtn);
}

function checkSequence(idx) {
  if (userSequence[idx] === gameSequence[idx]) {
    if (userSequence.length === gameSequence.length) {
      setTimeout(levelUp, 250);
    }
  } else {
    h2.innerHTML = `Game Over! Your score is <b>${level}</b><br><br>Press S to start the game again.`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "white";
    }, 200);

    highestScore();
    resetGame();
  }
}

function btnPress() {
  let btn = this;
  btnFlash(btn);

  let userColor = btn.getAttribute("id");
  userSequence.push(userColor);
  checkSequence(userSequence.length - 1);
}

function highestScore() {
  score.innerText = `Highest score is: ${level}`;
}

function resetGame() {
  gameSequence = [];
  userSequence = [];
  level = 0;
  gameStarted = false;
}
