let vizMap;
let notebookHandler;
let fake;
let canvaSize;

function preload() {
  notebookHandler = new NotebookHandler("./notebook.json");
  fake = loadJSON("./fake.json");
}

function setup() {
  canvaSize = windowHeight;
  createCanvas(canvaSize, canvaSize);
  angleMode(DEGREES);

  let mapBuilder = new MapBuilder();
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
