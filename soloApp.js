let user = document.getElementById("user");
let gameover = document.getElementById("gameover");
let currentScore = document.getElementById("currentScore");
let header = document.getElementsByTagName("h1")[0];
let restartButton = document.getElementById("takeScore");
let playerWins = document.getElementById("playerWins");
let playerLoses = document.getElementById("playerLoses");

let totalScore = 0;
let wins = 0;
let loses = 0;
let firstGo = 1;
let out = false;
let gameEnd = false;
let justClicked = false;
let timeOut = 0;
let won = false;

const restartGame = () => {
  out = false;
  won = false;
  gameEnd = false;
  firstGo = 1;
  totalScore = 0;
  currentScore.innerHTML = 0;
  gameover.style.visibility = "hidden";
  header.innerHTML = "Current Score";
  header.style.color = "#fff"
  header.style.textShadow = "none"

  playerBox[0].style.border = "2px solid yellow";
  playerBox[0].style.boxShadow = "0 0 10px 2px yellow";
  playerBox[0].style.opacity = "1.0";

  for (let i = 0; i < 6; i++) {
    sides[i].style.backgroundColor = "#000000";
    sides[i].style.backgroundImage =
      "linear-gradient(147deg, #000000 0%, #2c3e50 74%)";
  }
};

const checkWin = () => {
  if (totalScore >= 20 && won !== true) {
    header.innerHTML = "Congratulation you Win!";
    header.style.color = "#22B318";
    header.style.textShadow = "0 0 10px #33E127";
    wins++;
    playerWins.innerHTML = wins;
    won = true;
    for (let i = 0; i < 6; i++) {
      sides[i].style.transition = "1s ease";
      sides[i].style.background =
        "#378b29 linear-gradient(315deg, #378b29 0%, #74d680 74%)";
    }
  }
};

const addScore = (randomAngle) => {
  totalScore += randomAngle;
};

let cube = document.getElementById("cube");
let sides = cube.getElementsByTagName("div");
let playerBox = document.getElementsByClassName("word-spacer");

let angleArray = [
  [0, 0, 0],
  [-320, -362, -38],
  [-410, -320, -2],
  [125, -217, -88],
  [-234, -317, 5],
  [-47, -100, -81],
  [-133, -360, 53],
];

playerBox[0].style.border = "2px solid yellow";
playerBox[0].style.boxShadow = "0 0 10px 2px yellow";
playerBox[0].style.opacity = "1.0";

restartButton.addEventListener("click", () => {
  if (!justClicked) {
    restartGame();
  }
});

cube.addEventListener("click", (e) => {
  if (!justClicked) {
    justClicked = true;

    if (!gameEnd) {
      /* ANIMATION */
      let randomAngle = Math.floor(Math.random() * 6) + 1 + firstGo;

      if (randomAngle === 7) {
        randomAngle -= 1;
      }

      if (out === false) {
        firstGo = 0;
        cube.style.animation = "animate 1s linear";

        cube.style.transform =
          "rotateX(" +
          angleArray[randomAngle][0] +
          "deg) rotateY(" +
          angleArray[randomAngle][1] +
          "deg) rotateZ(" +
          angleArray[randomAngle][2] +
          "deg)";
        cube.style.transition = "1s linear";

        if (randomAngle === 1) {
          setTimeout(() => {
            for (let i = 0; i < 6; i++) {
              sides[i].style.transition = "1s ease";
              sides[i].style.background =
                "rgba(0, 0, 0, 0) linear-gradient(to right, rgb(235, 51, 73), rgb(244, 92, 67)) repeat scroll 0% 0%";
            }
            header.style.color = "#E12733"
            header.style.textShadow = "0 0 10px #E12733"
            gameover.style.visibility = "visible";
            header.innerHTML = "Game Over";
            if (won !== true) {
              loses++;
              playerLoses.innerHTML = loses;
              totalScore = 0;
            }
            out = true;
          }, 900);
        }

        if (randomAngle !== 1) {
          cube.addEventListener("animationend", (e) => {
            cube.style.animation = "";
          });
          setTimeout(() => {
            addScore(randomAngle),
              (currentScore.innerHTML = totalScore),
              checkWin();
          }, 1100);
        }
      } else {
        restartGame();
        gameover.style.visibility = "hidden";
      }
      if (randomAngle === 1) {
        out = true;
        firstGo = 1;
      }
    }
    setTimeout(() => {
      justClicked = false;
    }, 1100);
  }
});
