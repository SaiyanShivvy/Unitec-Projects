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
//Audio Control and Sound Effects
var press_start = new Audio("src/assets/start_sound.wav");
var collect_item = new Audio("src/assets/item_collect.wav");
var miss_item = new Audio("src/assets/item_miss.wav");
var game_over = new Audio("src/assets/game_over.wav");

// Try to mute all audio elements on the page
function mutePage() {
  var audios = document.querySelectorAll("audio");
  [].forEach.call(audios, function (audio) {
    muteMe(audio);
  });
}
//Time
function startTimer() {
  var presentTime = document.getElementById('time').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if (s == 59) {
    m = m - 1;
  }
  if (m < 0) {
    game_over.play();
    alert("Time's Up! Your Score was: " + score);
    gameOver = true;
    clearCanvas();
    stopTimer();

  }
  document.getElementById('time').innerHTML = m + ":" + s;
  var timer = setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {
    sec = "0" + sec
  } // add zero in front of numbers < 10
  if (sec < 0) {
    sec = "59"
  }
  return sec;
}

function stopTimer() {
  clearTimeout(timer);
}
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
        miss_item.play();
        seedArray.shift();
        //console.log(seedArray);
        requestAnimationFrame(animate);
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
var interval = 1000 / 60;

function createSeed() {
  if (seedArray.length < maxSeeds) {
    seed = new Seed(randomIntFromRange(50, 1230), randomIntFromRange(550, 680), 0, 6, '30');
    seedArray.push(seed);
  }
}

function animate() {
  if (gameOver) {
    console.log("gameover");
    clearCanvas();
  } else {
    requestAnimationFrame(animate);
    //Measure Time
    now = performance.now();
    delta = now - then;
    //Clear Canvas and redraw
    if (delta > interval) {
      clearCanvas();
      reDraw();
      createSeed();
      playerUpdate();
      for (var i = 0; i < seedArray.length; i++) {
        var seed = seedArray[i];
        seed.update();
        if (isColliding(player, seed)) {
          //console.log("Collided")
          score++;
          document.getElementById('score').innerText = score;
          seedArray.shift(seed);
          collect_item.play();
        }
      }
    }
    //Store Time
    then = now - (delta % interval);
  }
}

function reDraw() {
  drawGrass();
  drawChar();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function isColliding(rect, circle) {
  if (circle.x + circle.radius > rect.x &&
    circle.x - circle.radius < (rect.x + rect.width) &&
    circle.y + circle.radius > rect.y &&
    circle.y - circle.radius < (rect.y + rect.height)) {
    return true;
  }
}

function reset() {
  player.x = 0;
  seedArray.length = 0;
  clearCanvas();
}

function init() {
  reset();
  console.log("Game Start");
  document.getElementById('score').innerText = score;
  document.getElementById('time').innerHTML = 07 + ":" + 00;
  gameOver = false;
  score = 0;
  startTimer();
  requestAnimationFrame(animate);
}

function mute() {
  press_start.muted = false;
  collect_item.muted = false;
  miss_item.muted = false;
  game_over.muted = false;
  console.log("Muted Audio");
}

function unmute() {
  press_start.muted = true;
  collect_item.muted = true;
  miss_item.muted = true;
  game_over.muted = true;
  console.log("Unmuted Audio");
}