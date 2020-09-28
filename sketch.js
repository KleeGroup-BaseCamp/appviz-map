let vizMap;
let notebookHandler;
let fake;
let canvaSize;
let fonts = {};

function preload() {
  notebookHandler = new NotebookHandler("./notebook.json");
  fake = loadJSON("./fake.json");
  fonts.roboto = loadFont("fonts/Roboto-Regular.ttf");
  fonts.fa = loadFont("fonts/fa.otf");
  initStyles();
}

function setup() {
  canvaSize = windowHeight;
  createCanvas(canvaSize, canvaSize);
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
  canvaSize = windowHeight;
  resizeCanvas(canvaSize, canvaSize);
}
