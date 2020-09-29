let vizMap;
let notebookHandler;
let fake;
let canvasSize;
let fonts = {};

function preload() {
  notebookHandler = new NotebookHandler("./notebook.json");
  fake = loadJSON("./fake.json");
  fonts.roboto = loadFont("fonts/Roboto-Regular.ttf");
  fonts.fa = loadFont("fonts/fa.otf");
  initStyles();
}

function setup() {
  canvasSize = windowHeight;
  createCanvas(canvasSize, canvasSize);
  angleMode(DEGREES);
  vizMap = notebookHandler.handle(fake);
}

function draw() {
  vizMap = notebookHandler.handle(fake);
  let element = vizMap.findElement(mouseX, mouseY);
  vizMap.select(element);
  drawCursor(element != null);
  vizMap.render();
}

function drawCursor(isSelected) {
  cursor(isSelected ? "pointer" : "default");
}

function windowResized() {
  canvasSize = windowHeight;
  resizeCanvas(canvasSize, canvasSize);
}
