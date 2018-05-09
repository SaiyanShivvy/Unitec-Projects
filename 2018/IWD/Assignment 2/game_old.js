var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var deltaX = 0;
var deltaY = 0;
var keys = []; //store keypresses

function drawGrass() {
  grass = new Image();
  grass.src = 'src/assets/sample_grass.png';
  grass.onload = function() {
    ctx.drawImage(grass, 0, 300, 600, 150);
  }
}

function drawBG() {
  bg = new Image();
  bg.src = 'src/assets/sky.jpg';
  bg.onload = function() {
    ctx.drawImage(bg, 0, 0);
  }
}

//keyboard events
window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);

function drawTriangle() { //testing mr x using a triangle
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // the triangle
  ctx.beginPath();
  ctx.moveTo(200 + deltaX, 100 + deltaY);
  ctx.lineTo(170 + deltaX, 150 + deltaY);
  ctx.lineTo(230 + deltaX, 150 + deltaY);
  ctx.closePath();

  // the outline
  ctx.lineWidth = 10;
  ctx.strokeStyle = "rgba(102, 102, 102, 1)";
  ctx.stroke();

  // the fill color
  ctx.fillStyle = "rgba(255, 204, 0, 1)";
  ctx.fill();
}

//handle movement based on key pressed allows for diagonals, maybe changed
function keysPressed(e) {
  // store an entry for every key pressed
  keys[e.keyCode] = true;
  // left
  if (keys[37]) {
    deltaX -= 2;
  }
  // right
  if (keys[39]) {
    deltaX += 2;
  }
  // down
  if (keys[38]) {
    deltaY -= 2;
  }
  // up
  if (keys[40]) {
    deltaY += 2;
  }
  e.preventDefault();
  window.requestAnimationFrame(drawTriangle);
}

function keysReleased(e) {
  // mark keys that were released
  keys[e.keyCode] = false;
}

//call functions, order will determine which layers are on top
drawBG();
drawTriangle();
drawGrass();
window.requestAnimationFrame(drawTriangle);
