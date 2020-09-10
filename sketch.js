const map = new Map(null, null, null);
let prevHoveredElement = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
  map.render();
  // frameRate(5);
}

function draw() {
  handleHover();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  map.render();
}
