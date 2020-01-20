import GameMain from './main.js';

document.addEventListener("DOMContentLoaded", function () {
  
  const play = document.querySelector(".play");
  const canvas = document.getElementById("screen");
  const game = new GameMain

  play.addEventListener("click", () => {
    game.start();
  })

  canvas.style.height = "50vh";
  canvas.style.width = "256";
})