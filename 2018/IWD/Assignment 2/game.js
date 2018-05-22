//Canvas Variables
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
//------------------------------------------------------------//
//Game Variables
var gameOver = false; //if the game over condition has been met
var seeds = []; //stores seeds
var gameOver = false;
var player = {
  x: 0,
  y: 0,
  width: 232,
  height: 158,
  speed: 5,
  velX: 0,
  velY: 0
}
srcX = 0, srcY = 0;
//------------------------------------------------------------//
//Keyboard Stuff
var keys = [];
document.body.addEventListener("keydown", function (event) {
  keys[event.keyCode] = true;
});

document.body.addEventListener("keyup", function (event) {
  keys[event.keyCode] = false;
});
//------------------------------------------------------------//
// //just a background
// var background_Image = new Image();
// background_Image.src = "src/assets/sky.jpg";
// background_Image.onload = function() {
//   drawBase();
// }
//grass, spawn location of seeds
var grass_Image = new Image();
grass_Image.src = "src/assets/sample_grass.png";
grass_Image.onload = function () {
  drawBase();
}
//player
var player_Image = new Image();
player_Image.src = "src/assets/player_bird_ss.png";
player_Image.onload = function () {
  drawChar();
}
//------------------------------------------------------------//
function drawBase() {
  //ctx.drawImage(background_Image, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(grass_Image, 0, 450, canvas.width, canvas.height / 3);
}

function drawChar() {
  ctx.drawImage(player_Image, srcX, srcY, 927, 633, player.x, player.y, player.width, player.height);
  srcX += 927;
  if (srcX >= 7416) {
    srcX = 0;
  }
}

//------------------------------------------------------------//
//Game Functions
function gameLoop() {
  clear();
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function init() {
  return setInterval(gameLoop, 30);
}
