//Canvas Variables
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
//Timer for Animations
var now, delta;
var then = performance.now();
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
  //boundCircle: 20,
  pressedKeys: {
    left: false,
    right: false,
    up: false,
    down: false
  }
}
var srcX = 0,
  srcY = 0;
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
  ctx.drawImage(grass_Image, 0, 450, canvas.width, canvas.height / 2);
}

function drawChar() {
  // ctx.drawImage(player_Image, srcX, srcY, 927, 633, player.x, player.y, player.width, player.height);
  // srcX += 927;
  // if (srcX >= 7416) {
  //   srcX = 0;
  // }
  ctx.fillRect(player.x, player.y, player.width, player.height);
}
//------------------------------------------------------------//
//Utility functions
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
  var rg = ctx.createRadialGradient(x, y, radius, x, y, 24);
  rg.addColorStop(growth, 'green');


  this.update = function () {
    // Check if its off the canvas
    if (this.y + this.radius + this.dy <= canvas.height) {
      this.dy = -2.4; //this.dy -= 2;
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

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = rg; //radial gradient here
    ctx.fill();
    ctx.closePath();
  }
}

function playerUpdate() {
  var dM = 5;
  if (player.pressedKeys.left) {
    player.x -= dM;
  }
  if (player.pressedKeys.right) {
    player.x += dM;
  }
  if (player.pressedKeys.up) {
    player.y -= dM;
  }
  if (player.pressedKeys.down) {
    player.y += dM;
  }

  // Flip position at boundaries
  if (player.x > canvas.width) {
    player.x -= canvas.width
  } else if (player.x < 0) {
    player.x += canvas.width
  }
  if (player.y > canvas.height) {
    player.y -= canvas.height
  } else if (player.y < 0) {
    player.y += canvas.height
  }
}
//------------------------------------------------------------//
//Implementation
var seed;
var seedArray = [];
var maxSeeds = 2; //testing
var score = 0;
var interval = 1000/30;

function createSeed() {
  if (seedArray.length < maxSeeds) {
    seed = new Seed(randomIntFromRange(50, 1230), randomIntFromRange(550, 680), 0, 6, '30');
    seedArray.push(seed);
  }
}

function animate() {
  requestAnimationFrame(animate);
  //Measure Time
  now = performance.now();
  delta = now - then;
  //Clear Canvas and redraw
  if (delta > interval){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    reDraw();
    createSeed();
    playerUpdate();
    for (var i = 0; i < seedArray.length; i++) {
      var seed = seedArray[i];
      seed.update();
    }
    if (isColliding(player, seed)) {
      console.log("Collided")
      seedArray.shift();
    }
  }
  //Store Time
  then = now - (delta % interval);
}

function reDraw() {
  drawGrass();
  drawChar();
}

function isColliding(objRect, objCircle) {
  var distX = Math.abs(objCircle.x - (objRect.x - objRect.w / 2));
  var distY = Math.abs(objCircle.y - (objRect.y - objRect.h / 2));

  if (distX <= (objRect.w / 2)) {
    console.log("Done");
    return true;
  }
  if (distY <= (objRect.h / 2)) {
    console.log("Done");
    return true;
  }
  if (distX > (objRect.w / 2 + objCircle.radius)) {
    return false;
  }
  if (distY > (objRect.w / 2 + objCircle.radius)) {
    return false;
  }
  var dx = distX - objRect.w / 2;
  var dy = distY - objRect.h / 2;

  return (dx * dx + dy * dy <= (objCircle.radius * objCircle.radius));
}

function init() {
  console.log("Game Start");
  animate();
}