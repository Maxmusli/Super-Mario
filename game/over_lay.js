import GameMain from './main.js';

document.addEventListener("DOMContentLoaded", function () {
  
  const play = document.querySelector(".play");
  const canvas = document.getElementById("screen");
  const game = new GameMain
  let gameStart = false

  play.addEventListener("click", () => {
    if (!gameStart) {
      gameStart = true
      game.start();
    } 
  })

  canvas.style.height = "50vh";
  canvas.style.width = "256";
})