let gameState = 'start';
let canvi, intervalIdLeft, intervalIdRight, jesusTimeout, randomData, jesusChristMovement, 
lobotomyMovement, mexicanMovement, secondsStr, mainLoop, randomInterval, timeInterval;
const player = new Image();
const america = new Image();
player.src = 'mexicancatcher.png';
let playerPosition = { x: 200, y: 375 };
let isMovingLeft = false;
let isMovingRight = false;
const bg = new Image();
bg.src = 'desert.png';
america.src = 'america.png';
const mexican = new Image();
mexican.src = 'mexican.png';
let mexicanPosition = { x: Math.floor(Math.random() * 550) + 1, y: 0 };
let mexicanSpeed = 9;
const jesusChrist = new Image();
jesusChrist.src = 'jesuschrist.png';
let jesusChristPosition = { x: Math.floor(Math.random() * 550) + 1, y: -200};
let jesusDelay = false;
const lobotomy = new Image();
lobotomy.src = 'lobotomy.png';
let lobotomyPosition = { x: Math.floor(Math.random() * 550) + 1, y: -200};
const startScreen = new Image();
startScreen.src = 'start.png';
const gameOverScreen = new Image();
gameOverScreen.src = 'gameover.png';
const retryButton = new Image();
retryButton.src = 'retry.png';
let highestScore = 0;
let dashes = 3;
let dashTime = 30;
let POINTS = 0;
let minutes = 0;
let seconds = 0;

function programStart() {
  document.getElementById('highscore').innerText = 'High Score: ' + highestScore;
  document.getElementById("currentspeed").innerText = 'Current Speed:  ' + mexicanSpeed;
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    canvi = canvas.getContext("2d");
  } else {
    alert("Canvas not supported! Please switch to a different browser.");
    alert("I SAID SWITCH TO ANOTHER BROWSER MOTHERFUCKER");
  };   
  startScreen.onload = ()  => {
    canvi.drawImage(startScreen, 0, 0, canvas.width, canvas.height);
  }
}

function gameLoop() {
  timeInterval = setInterval(() => {
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
    }
  }, 1000);
 randomInterval = setInterval(() => {
    randomData = Math.floor(Math.random() * 100) + 1;
    console.log(randomData);
  }, 1000);
  mainLoop = setInterval(() => {
    drawCanvas();
    checkCollision();
    if (mexicanPosition.y >= 600) {
      die();
    }
    if (lobotomyPosition.y >= 600) {
      clearInterval(lobotomyMovement);
      lobotomyMovement = null;
      lobotomyPosition.y = -200;
      lobotomyPosition.x = Math.floor(Math.random() * 550) + 1;
    }
    if (jesusChristPosition.y >= 600) {
      clearInterval(jesusChristMovement);     jesusChristMovement = null;
      jesusChristPosition.y = -200;
    }
      if ([49, 50].includes(randomData) && !jesusChristMovement && !jesusDelay) {
          jesusChristMovement = setInterval(() => {
            jesusChristPosition.y += 11;
        }, 33) 
        jesusDelay = true;
        jesusTimeout = setTimeout(() => {
          jesusDelay = false;
        }, 30 * 1000);
      }
      if ([33].includes(randomData) && !lobotomyMovement) {
        lobotomyMovement = setInterval(() => {
          lobotomyPosition.y += 15;
        }, 33);
      }
      if (!mexicanMovement) {
      mexicanMovement = setInterval(() => {
        mexicanPosition.y += mexicanSpeed;
      }, 33);
    }
  }, 33);
   dashInterval = setInterval(() => {
    dashTime--;
    if (dashTime == 0) {
      dashTime = 30;
      dashes++;
    }
  }, 1000);
}

function gameStart() {
  gameState = 'alive';
  gameLoop();
  sponge.src='spongebobhappy.png';
}

function drawCanvas() {
  canvi.clearRect(0, 0, canvas.width, canvas.height);
  canvi.drawImage(bg, 0, 0, 600, 600);
  canvi.drawImage(player, playerPosition.x, playerPosition.y, 100, 100);
  canvi.drawImage(america, 20, 490, 550, 50);
  canvi.drawImage(mexican, mexicanPosition.x, mexicanPosition.y, 100, 100);
  canvi.drawImage(jesusChrist, jesusChristPosition.x, jesusChristPosition.y, 100, 100)
  canvi.drawImage(lobotomy, lobotomyPosition.x, lobotomyPosition.y, 100, 100);
  canvi.font = "30px futura";
  canvi.fillStyle = "black";
  canvi.fillText("Illegals Captured: " + POINTS, 10, 30);
  canvi.fillText("Dashes: " + dashes, 10, 60);
  secondsStr = seconds < 10 ? '0' + seconds : seconds;
  canvi.fillText("Time: " + minutes + ":" + secondsStr, 450, 30);
  canvi.fillStyle = "red";
  canvi.fillText(dashTime, 150, 60);
}

function areSpritesTouching(sprite1, sprite2, sprite1Width, sprite1Height, sprite2Width, sprite2Height) {
  const sprite1BoundingBox = {
    left: sprite1.x,
    top: sprite1.y,
    right: sprite1.x + sprite1Width,
    bottom: sprite1.y + sprite1Height
  };
  const sprite2BoundingBox = {
    left: sprite2.x,
    top: sprite2.y,
    right: sprite2.x + sprite2Width,
    bottom: sprite2.y + sprite2Height
  };
  if (
    sprite1BoundingBox.left < sprite2BoundingBox.right &&
    sprite1BoundingBox.right > sprite2BoundingBox.left &&
    sprite1BoundingBox.top < sprite2BoundingBox.bottom &&
    sprite1BoundingBox.bottom > sprite2BoundingBox.top
  ) {
    return true;
  } else {
    return false;
  }
}

function checkCollision() {
   if (areSpritesTouching(playerPosition, mexicanPosition, 100, 100, 100, 100)) {
    gainPoint();
   }
   if (areSpritesTouching(playerPosition, jesusChristPosition, 100, 100, 100, 100)) {
    dashes += 2;
    jesusChristPosition.y = -200;
    clearInterval(jesusChristMovement);
    jesusChristMovement = null;
    jesusChristPosition.x = Math.floor(Math.random() * 550) + 1;
   }
   if (areSpritesTouching(playerPosition, lobotomyPosition, 100, 100, 100, 100)) {
    lobotomyPosition.y = -200;
    clearInterval(lobotomyMovement);
    lobotomyMovement = null;
    lobotomyPosition.x = Math.floor(Math.random() * 550) + 1;
    let formerMexicanSpeed = mexicanSpeed;
    mexicanSpeed = 8;
    setTimeout(() => {
      mexicanSpeed = formerMexicanSpeed;
      mexicanSpeed += 0.24;
    }, 4 * 1000);
   }
} 

function gainPoint() {
  mexicanPosition.y = 0;
  mexicanPosition.x = Math.floor(Math.random() * 550) + 1;
  POINTS++;
  mexicanSpeed += 0.08;
  document.getElementById("currentspeed").innerText = 'Current Speed:  ' + Math.round(mexicanSpeed);
}

function die() {
  highestScore = POINTS > highestScore ? POINTS : highestScore;
  gameState = 'dead';
  canvi.clearRect(0, 0, canvas.width, canvas.height);
  clearInterval(mainLoop);
  clearInterval(intervalIdRight);
  clearInterval(mexicanMovement);
  mexicanMovement = null;
  clearInterval(intervalIdLeft);
  clearInterval(dashInterval);
  clearInterval(jesusChristMovement);
  jesusChristMovement = null;
  clearInterval(randomInterval);
  clearInterval(timeInterval);
  clearInterval(lobotomyMovement);
  lobotomyMovement = null;
  clearTimeout(jesusTimeout);
  jesusTimeout = null;
  canvi.drawImage(gameOverScreen, 0, 0, canvas.width, canvas.height);
  canvi.drawImage(retryButton, 200, 400, 200, 50);
  canvi.fillStyle = "black";
  canvi.fillText("Illegals Captured: " + POINTS, 10, 30);
  canvi.fillText("Dashes: " + dashes, 10, 60);
  canvi.fillText("Time: " + minutes + ":" + secondsStr, 450, 30);
  canvi.fillStyle = "red";
  canvi.fillText(dashTime, 150, 60);
  document.getElementById('highscore').innerText = 'High Score: ' + highestScore;
  sponge.src='spongebobsad.png';
}

function startOver() {
 gameState = 'alive';
 POINTS = 0;
 dashes = 3;
 mexicanSpeed = 9;
 dashTime = 30;
 seconds = 0;
 minutes = 0;
 jesusDelay = false;
 playerPosition.x = 200;
 mexicanPosition.y = 0;
 mexicanPosition.x = Math.floor(Math.random() * 550) + 1;
 jesusChristPosition.y = -200;
 jesusChristPosition.x = Math.floor(Math.random() * 550) + 1;
 lobotomyPosition.y = -200;
 lobotomyPosition.x = Math.floor(Math.random() * 550) + 1;
 gameLoop();
 document.getElementById("currentspeed").innerText = 'Current Speed:  ' + mexicanSpeed;
 sponge.src='spongebobhappy.png';
}
document.addEventListener("DOMContentLoaded", function() {
  programStart();
  document.addEventListener("keydown", function(event, isInterval) {
    if (event.key == ' ') {
      event.preventDefault(); 
    }
    if (gameState == 'start' && event.key == ' ') {
      gameStart();
    }
    if (['start', 'dead'].includes(gameState) && event.key == '1') {
      bg.src = 'desert.png';
    }
    if (['start', 'dead'].includes(gameState) && event.key == '2') {
      bg.src = 'dannywilliams.png';
    }
    if (['start', 'dead'].includes(gameState) && event.key == '3') {
      bg.src = 'realdukedennis.png';
    }
    if (gameState == 'dead' && event.key == ' ') {
      startOver();
    }
    if (event.key == 'ArrowLeft' && !isMovingLeft) {
      isMovingLeft = true;
      intervalIdLeft = setInterval(function() {
        playerPosition.x -= 10;
       if (playerPosition.x <= -100) {
         playerPosition.x = 600;
       } 
      }, 30);
    }
    if (event.key == 'ArrowRight' && !isMovingRight) {
      isMovingRight = true;
      intervalIdRight = setInterval(function() {
        playerPosition.x += 10;
        if (playerPosition.x >= 600) {
          playerPosition.x = -100;
        }
      }, 30);
    }
    if (event.key == ' ' && isMovingRight && dashes > 0){
      playerPosition.x += 150;
      dashes--;
    }
    if (event.key == ' ' && isMovingLeft && dashes > 0) {
      playerPosition.x -= 150;
      dashes--;
    }
    //debug
    if (event.key == 'r' && gameState == 'alive') {
      die();
    }
  });

document.addEventListener("keyup", function(event) {
  if (event.key == 'ArrowLeft') {
    clearInterval(intervalIdLeft);
    isMovingLeft = false;
  }
  if (event.key == 'ArrowRight') {
    clearInterval(intervalIdRight);
    isMovingRight = false;
  }
});
  
canvas.addEventListener('click', function(event) {
  const mouseRect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - mouseRect.left;
  const mouseY = event.clientY - mouseRect.top;
  if (
    mouseX >= 200 &&  
    mouseX <= 400 && 
    mouseY >= 400 &&  
    mouseY <= 450 && gameState == 'dead'
  ) {
    startOver();
  }
})
});


