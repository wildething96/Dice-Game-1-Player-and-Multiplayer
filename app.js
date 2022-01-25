let players = localStorage.getItem("someVarKey");

function getPlayers(p) {
  var someVarName = parseInt(p) + 1;
  localStorage.setItem("someVarKey", someVarName);
}

let currentPlayer = 1;
let playerNumber = document.getElementById("currentPlayer");
playerNumber.innerHTML = currentPlayer;

let user = document.getElementById("user");
let gameover = document.getElementById("gameover");
let leftSide = document.getElementById("left-side");
let rightSide = document.getElementById("right-side");
let currentScore = document.getElementById("currentScore");
let playerBar = document.getElementsByClassName("playerNumbers");
let playerScores = document.getElementsByClassName("playerScores");
let header = document.getElementsByTagName("h1")[0];
let holdButton = document.getElementById("takeScore");

let totalScore = 0;
let count = 1;
let count2 = 0;
let firstGo = 1;
let out = false;
let gameEnd = false;
let highestScore = 0;
let highestScorer;
let justClicked = false;
let timeOut = 0;

const advancePlayer = () => {
  highestScore < totalScore
    ? ((highestScore = totalScore), (highestScorer = currentPlayer))
    : 0;
  playerScores[currentPlayer - 1].innerHTML = totalScore;
  totalScore = 0;
  currentPlayer++;
  currentScore.innerHTML = 0;
  playerNumber.innerHTML = currentPlayer;

  playerBox[currentPlayer - 1].style.border = "2px solid yellow";
  playerBox[currentPlayer - 1].style.opacity = "1.0";
  playerBox[currentPlayer - 1].style.boxShadow = "0 0 10px 2px yellow";

  playerBox[currentPlayer - 2].style.border = "none";
  playerBox[currentPlayer - 2].style.opacity = "0.7";
  playerBox[currentPlayer - 2].style.boxShadow = "none";

  checkGameEnd();
};

const restartGame = () => {
  totalScore = 0;
  header.innerHTML = "Current Score";
  currentScore.innerHTML = totalScore;
  highestScore = 0;
  highestScore = "";
  for (let i = 0; i < players; i++) {
    playerScores[i].innerHTML = "";
  }

  holdButton.innerHTML = "HOLD";
  gameEnd = false;
  currentPlayer = 1;
  playerNumber.innerHTML = currentPlayer;
  playerBox[0].style.border = "2px solid yellow";
  playerBox[0].style.boxShadow = "0 0 10px 2px yellow";
  playerBox[0].style.opacity = "1.0";
};

holdButton.addEventListener("click", () => {
  if (gameEnd) {
    restartGame();
  } else if (totalScore !== 0) {
    advancePlayer();
  }
});

const checkGameEnd = () => {
  if (currentPlayer > players - 1) {
    holdButton.innerHTML = "Restart Game?";
    playerNumber.innerHTML = currentPlayer - 1;
    header.innerHTML = `The Winner is Player ${highestScorer}`;
    gameEnd = true;
  }
};

console.log(header);

for (let i = 1; i < players; i++) {
  players / 2 >= i
    ? ((leftSide.innerHTML += user.innerHTML),
      console.log(0),
      count > 3 ? (count = 0) : 0)
    : ((rightSide.innerHTML += user.innerHTML), console.log(1));

  playerBar[i].innerHTML = i + 1;
  count++;
}

console.log(playerBar);

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

console.log("1." + sides);

playerBox[0].style.border = "2px solid yellow";
playerBox[0].style.boxShadow = "0 0 10px 2px yellow";
playerBox[0].style.opacity = "1.0";

cube.addEventListener("click", (e) => {
  
  if(!justClicked){
    
  justClicked = true;
  if (!gameEnd) {
    /* ANIMATION */

    let randomAngle = Math.floor(Math.random() * 6) + 1 + firstGo;
    if (randomAngle === 7) {
      randomAngle -= 1;
    }

    console.log(randomAngle);

    if (randomAngle === 1) {
      setTimeout(() => {
        for (let i = 0; i < 6; i++) {
          sides[i].style.transition = "1s ease";
          sides[i].style.background =
            "rgba(0, 0, 0, 0) linear-gradient(to right, rgb(235, 51, 73), rgb(244, 92, 67)) repeat scroll 0% 0%";
        }
        gameover.style.visibility = "visible";
        header.innerHTML = "Game Over";
        highestScore < totalScore
          ? ((highestScore = totalScore), (highestScorer = currentPlayer))
          : 0;
        totalScore = 0;
      }, 900);
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

      if (randomAngle !== 1) {
        cube.addEventListener("animationend", (e) => {
          cube.style.animation = "";
        });
        setTimeout(() => {
          addScore(randomAngle), (currentScore.innerHTML = totalScore);
        }, 1100);
      }
    } else {
      out = false;
      header.innerHTML = "Current Score";
      gameover.style.visibility = "hidden";
      advancePlayer();
      for (let i = 0; i < 6; i++) {
        sides[i].style.backgroundColor = "#000000";
        sides[i].style.backgroundImage =
          "linear-gradient(147deg, #000000 0%, #2c3e50 74%)";
      }
    }

    if (randomAngle === 1) {
      out = true;
      firstGo = 1;
    }
  }
  setTimeout(() => {
    justClicked = false;
  }, 1100)
}
});
