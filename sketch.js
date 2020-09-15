let vizMap;
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
  //---
  let element = vizMap.findElement(mouseX, mouseY);
  vizMap.select(element);

  drawCursor(element!=null);
  //----
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
