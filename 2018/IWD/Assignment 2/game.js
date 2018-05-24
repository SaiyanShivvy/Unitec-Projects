//Canvas Variables
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
//------------------------------------------------------------//
//Game Variables
var gameOver = false;
var seeds = [];
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
document.body.addEventListener("keydown", function (event) {
  keys[event.keyCode] = true;
});

document.body.addEventListener("keyup", function (event) {
  keys[event.keyCode] = false;
});

var background_Image = new Image();
background_Image.src = "src/assets/sky.jpg";
background_Image.onload = function() {
 drawBase();
}

var grass_Image = new Image();
grass_Image.src = "src/assets/sample_grass.png";
grass_Image.onload = function () {
  drawBase();
}

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
/**
 * Check session buddy for links
 *
 */

var maxSeeds = 10;
var seedArray = [];
// define a gradient for circles
const gradientRadius = 10;
const grad = ctx.createRadialGradient(0,0,0,0,0,gradientRadius); // gradient 10 pixels radius at 0,0
grad.addColorStop(1,"rgba(255,0,0,0)");
grad.addColorStop(0,"rgba(0,0,0,1)");

const gravity = 0.9; // gravity acceleration

// draws a circle using grad (above)
function drawCircle(x,y,radius){
    var scale = radius / gradientRadius;
    ctx.fillStyle = grad;
    ctx.setTransform(scale, 0, 0, scale, x, y);
    ctx.beginPath();
    ctx.arc(0, 0, radius / scale, 0, Math.PI * 2);
    ctx.fill();
}

// this object handles all circles. Circles are stored in the array circles.items
// the function update and draw both return the circles object so that they
// can be chained.
const circles = {
    items : [], // array of circles
    add(x,y,radius){
        var circle;
        circles.items.push(circle = {
            x,y,radius,
            dx : 0,  // delta x and y (movement per frame
            dy : 0,
        });
        return circle;
    },
    update(){
        var i,c;
        for(i = 0; i < circles.items.length; i++){
            c = circles.items[i]; // get the circle
            c.dy += gravity;
            c.x += c.dx;
            c.y += c.dy;
            // simulate bounce.. This is the most basic, search SO for better methods
            if(c.y + c.radius > ctx.canvas.height){
                c.y = ctx.canvas.height - c.radius;
                c.dy = -Math.abs(c.dy);  // window resize may cause ball to be moving up when
                                         // it hits the bottom so need to ensure the bounce is
                                         // away from the bottom with Math.abs
            }
        }
        return circles;
    },
    draw(){
        var i,c;
        for(i = 0; i < circles.items.length; i++){
            c = circles.items[i]; // get the circle
            drawCircle(c.x,c.y,c.radius);
        }
        return circles;
    }
}

// main animation loop called once every 1/60th second (if possible)
// It checks if the widow size matches the canvas and will resize it
// if not.
// Then clears the canvas and updates and draws the circles.
// Then requests the next animation frame
function mainLoop(time){
    if(canvas.width !== innerWidth || canvas.height !== innerHeight){ // resize canvas if window size has changed
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    }
    ctx.setTransform(1,0,0,1,0,0); // set default transform
    ctx.clearRect(0,0,canvas.width,canvas.height); // clear the canvas
    circles.update().draw();
    requestAnimationFrame(mainLoop);
}
requestAnimationFrame(mainLoop);
