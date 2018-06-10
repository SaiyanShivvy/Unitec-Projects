//Canvas Variables
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
//------------------------------------------------------------//
//Game Variables
var gameOver = false;
//to be refactored into a class
var player = {
  x: 0,
  y: 0,
  width: 186,
  height: 127,
  speed: 5,
  velX: 0,
  velY: 0,
  pressedKeys: {
    left: false,
    right: false,
    up: false,
    down: false
  }
}
var srcX = 0, srcY = 0;
//------------------------------------------------------------//
var grass_Image = new Image();
grass_Image.src = "src/assets/sample_grass.png";
grass_Image.onload = function () {
  drawGrass();
}

var player_Image = new Image();
player_Image.src = "src/assets/player_bird_ss.png";
//------------------------------------------------------------//
function drawGrass() {
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
//Utility functions
// generic way to set animation up
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//Key Handlers
var keyMap = {
  68: 'right',
  65: 'left',
  87: 'up',
  83: 'down'
}

function keydown(event) {
  var key = keyMap[event.keyCode]
  player.pressedKeys[key] = true
}

function keyup(event) {
  var key = keyMap[event.keyCode]
  player.pressedKeys[key] = false
}

window.addEventListener("keydown", keydown, false)
window.addEventListener("keyup", keyup, false)
//------------------------------------------------------------//
//Object - Circle
function Seed(x, y, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  var growth = 0.25;
  var rg = ctx.createRadialGradient(x + dy, y + dy, radius, x + dy, y + dy, 24);  
  rg.addColorStop(growth, 'green');


  this.update = function() {
    // Check if its off the canvas
    if (this.y + this.radius + this.dy <= canvas.height) {
      this.dy = -1.4; //this.dy -= 2;
      if (this.y + this.radius + this.dy <= 0) {
        console.log("reached top");
        seedArray.shift();
        console.log(seedArray);
        if (seedArray.length < 1) {
          animate();
        }
      }
    }
    //check if its 'fully grown'
    if (this.radius <= 24) {
      this.radius += growth;
      rg.addColorStop(growth, 'green');
      this.color = rg;
      rg.addColorStop(growth, 'red');
      this.color = rg;
    } else {
      //if its 'mature' then move it
      this.y += this.dy;
    }
    this.draw();
  }

  this.draw = function() {;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = rg; //radial gradient here
    ctx.fill();
    ctx.closePath();
  }
}

function player(){
  //redraw, cycle through animation frames, movement, collision detection.
  this.updateFrame = function() {
  }
  this.draw = function(){
  }
}
//------------------------------------------------------------//
//for time based animation
var now, delta;
// High resolution timer
var then = performance.now();
//Implementation
var seed;
var seedArray = [];
var maxSeeds = 3; //testing

function init() {
  console.log("Game Init'd");
  animate();
}

function createSeed() {
  seed = new Seed(randomIntFromRange(50, 750), randomIntFromRange(500, 550), 0, 6, '30');
  seedArray.push(seed);
  //console.log(seed);
}

//
function animate() {
  // Measure time, with high resolution timer
  now = performance.now();
  // How long between the current frame and the previous one ?
  delta = now - then;
  //console.log(delta);
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  reDraw();

  if(seedArray.length < maxSeeds){
    createSeed();
  }

  for (var i = 0; i < seedArray.length; i++) {
    seedArray[i].update();
  }

  // Store time
  then = now;

  requestAnimationFrame(animate);
}



function reDraw(){
  drawChar();
  drawGrass();
}

function collisionDetect() {

}
