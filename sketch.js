const map = new Map(null, null, null);

let prevHoveredElement = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30, 61, 116);
  map.render();
  // frameRate(5);
}

function draw() {
  handleHover();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(30, 61, 116);
  map.render();
}
