//Canvas Variables
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
//------------------------------------------------------------//
//Game Variables
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
var grass_Image = new Image();
grass_Image.src = "src/assets/sample_grass.png";
grass_Image.onload = function() {
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
//Object - Circle
function Seed(x, y, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  var rg = ctx.createRadialGradient(x, y, radius, x, y, 24);
  var growth = 0.5;
  var colorState = 1;

  this.update = function() {
    // Check if its off the canvas
    if (this.y + this.radius + this.dy <= canvas.height) {
      this.dy = -2; //this.dy -= 2;
      if (this.y + this.radius + this.dy <= 0) {
        console.log("reached top");
        seedArray.shift();
        console.log(seedArray);
        //createSeed();
        // if (seedArray.length < 1){
        //   createSeed();
        //   console.log(this.dy);
        // }
      }
    }
    //check if its 'fully grown'
    if (this.radius <= 24) {
      this.radius += growth;
      rg.addColorStop(0.5, 'red');
      this.color = rg;
    } else {
      //if its 'mature' then move it
      this.y += this.dy;
      rg.addColorStop(1, 'red');
      this.color = rg;
      this.dy = 0;
    }
    //redraw it
    this.draw();
  }

  this.draw = function() {;
    rg.addColorStop(0, 'green');
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
var maxSeeds = 6; //testing
var fps = 30;

function init() {
  createSeed();
}

function createSeed(){
  clearInterval(SI);
  seed = new Seed(randomIntFromRange(50, 750), randomIntFromRange(500, 550), 0, 6, '30');
  seedArray.push(seed);
  console.log(seed);
  var SI = setInterval(limitLoop(createSeed(), 60), 30);
  limitLoop(animate(), 60);
}

function animate() {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrass();

  for (var i = 0; i < seedArray.length; i++) {
    seedArray[i].update();
  }


}

//ultilty functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function collisionDetect(){

}

var limitLoop = function (fn, fps) {

    // Use var then = Date.now(); if you
    // don't care about targetting < IE9
    var then = new Date().getTime();

    // custom fps, otherwise fallback to 60
    fps = fps || 60;
    var interval = 1000 / fps;

    return (function loop(time){
        requestAnimationFrame(loop);

        // again, Date.now() if it's available
        var now = new Date().getTime();
        var delta = now - then;

        if (delta > interval) {
            // Update time
            // now - (delta % interval) is an improvement over just
            // using then = now, which can end up lowering overall fps
            then = now - (delta % interval);

            // call the fn
            fn();
        }
    }(0));
};
