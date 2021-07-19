// get the id
var mycanvas = document.getElementById("mycanvas");

// set the height and width
mycanvas.width = window.innerWidth;
mycanvas.height = window.innerHeight;

// create context
var ctx = mycanvas.getContext("2d");

// mouse move interaction - adding event listener
// create a mouse object
var mouse = {
  x: undefined,
  y: undefined,
};

var maxRadius = 40;

// color array
var colors = [
  "red",
  "blue",
  "pink",
  "teal",
  "purple",
  "black",
  "green",
  "coral",
  "aquamarine",
];

window.addEventListener("mousemove", circleZoom);

function circleZoom(e) {
  mouse.x = e.x;
  mouse.y = e.y;
}

window.addEventListener("resize", adjustWindow);

function adjustWindow() {
  mycanvas.width = window.innerWidth;
  mycanvas.height = window.innerHeight;
  init();
}

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colors[Math.floor(Math.random() * colors.length)];

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = "green";

    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = function () {
    if (this.x + radius > innerWidth || this.x - radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + radius > innerHeight || this.y - radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

var circleArr = [];
function init() {
  circleArr = [];

  for (i = 0; i < 900; i++) {
    var radius = Math.floor(Math.random() * 4 + 1);
    var x = Math.floor(Math.random() * (innerWidth - radius * 2) + radius);
    var y = Math.floor(Math.random() * (innerHeight - radius * 2) + radius);
    var dx = Math.random() - 0.5;
    var dy = Math.random() - 0.5;
    circleArr.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (i = 0; i < circleArr.length; i++) {
    circleArr[i].update();
  }
}

animate();
init();
