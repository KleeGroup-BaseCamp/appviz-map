let vizMap;
let prevHoveredElement;
let notebook;

function preload() {
  notebook = loadJSON("./notebook.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  vizMap = new Map(null, null, notebook.sketches);
}

function draw() {
  vizMap.findElement(mouseX, mouseY);
  vizMap.handleHover();
  vizMap.render();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
