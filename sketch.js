let vizMap;
let notebookHandler;

function preload() {
  notebookHandler = new NotebookHandler("./notebook.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  vizMap = new Map(null, null, notebookHandler);
}

function draw() {
  let element = vizMap.findElement(mouseX, mouseY);
  vizMap.select(element);
  drawCursor(element != null);
  vizMap.render();
}

function drawCursor(isSelected) {
  if (isSelected) {
    document.querySelector("main").style.cursor = "pointer";
  } else {
    document.querySelector("main").style.cursor = "default";
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
