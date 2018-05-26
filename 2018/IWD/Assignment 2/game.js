//Canvas Variables
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
//------------------------------------------------------------//
//Game Variables
var gameOver = false;
var keys = [];
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
document.body.addEventListener("keydown", function(event) {
  keys[event.keyCode] = true;
});

document.body.addEventListener("keyup", function(event) {
  keys[event.keyCode] = false;
});

var background_Image = new Image();
background_Image.src = "src/assets/sky.jpg";
background_Image.onload = function() {
  drawBase();
}

var grass_Image = new Image();
grass_Image.src = "src/assets/sample_grass.png";
grass_Image.onload = function() {
  drawBase();
}

var player_Image = new Image();
player_Image.src = "src/assets/player_bird_ss.png";
player_Image.onload = function() {
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
//Object - Circle
var growth = 0.5;

function Seed(x, y, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dy = dy;
  this.radius = radius;
  this.color = color;



  this.update = function() {
    // Check if its off the canvas
    if (this.y + this.radius + this.dy <= canvas.height) {
      this.dy = -2; //this.dy -= 2;
		}
    //check if its 'fully grown'
    if (this.radius <= 60){
      this.radius += growth;
    }
    else {
      //if its 'mature' then move it
      this.y += this.dy;
    }
    //redraw it
		this.draw();
  }

  this.draw = function() {
    var rg = ctx.createRadialGradient(10,10,10,10,10,100);
    //rg.addColorStop(0, "green");
    rg.addColorStop(0, 'red');
    //rg.addColorStop(0.4, "red");
    //rg.addColorStop(0.6, "red");
    //rg.addColorStop(1, "green");

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = rg; //radial gradient here
    ctx.fill();
    ctx.closePath();
  }
}

//implementation
var seed;
var seedArray = [];
function init() {
  seed = new Seed(300, 300, 0, 6, '30');
  seedArray.push(seed);
  console.log(seed);
}

function animate() {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < seedArray.length; i++){
    seedArray[i].update();
  }
}

//ultilty functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

init();
animate();
