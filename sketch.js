let vizMap;
let notebookHandler;

function preload() {
  notebookHandler = new NotebookHandler("./notebook.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  let mapBuilder = new MapBuilder();
  // notebookHandler.handle(mapBuilder);
  vizMap = mapBuilder.buildTestMap();
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
