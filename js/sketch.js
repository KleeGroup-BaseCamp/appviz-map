let vizMap;
let notebookHandler;
let fake;
let canvasSize;
let group = false // temp variable
let style;
const state = new State(); 

function preload() {
  notebookHandler = new NotebookHandler("./notebook.json");
  fake = loadJSON("./fake.json");
  style = new Style();
}

function setup() {
  canvasSize = windowHeight;
  createCanvas(canvasSize, canvasSize);
  angleMode(DEGREES);
}

function draw() {
  vizMap = notebookHandler.handle(fake);

  const element = vizMap.findElement(mouseX, mouseY)
  vizMap.select(element);
  //--- cursor
  const isSelected = element != null;
  cursor(isSelected ? "pointer" : "default");
  //--- render
  vizMap.render();
}

function mouseClicked() {
  const element = vizMap.findElement(mouseX, mouseY);
  vizMap.click(element)
}



function windowResized() {
  canvasSize = windowHeight;
  resizeCanvas(canvasSize, canvasSize);
}