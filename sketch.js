let vizMap;
let notebookHandler;
let fake;

function preload() {
  notebookHandler = new NotebookHandler("./notebook.json");
  fake = loadJSON("./fake.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  let mapBuilder = new MapBuilder();
  vizMap = notebookHandler.handle(fake);
}

function draw() {
  let element = vizMap.findElement(mouseX, mouseY);
  vizMap.select(element);
  drawCursor(element != null);
  vizMap.render();
}

function drawCursor(isSelected) {
  cursor(isSelected ? "pointer" : "default");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
