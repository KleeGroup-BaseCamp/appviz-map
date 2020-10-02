let vizMap;
let notebookHandler;
let fake;
let canvasSize;
let fonts = {};
let group = false // temp variable
let cnv;
let style;

function preload() {
  notebookHandler = new NotebookHandler("./notebook.json");
  fake = loadJSON("./fake.json");
  fonts.roboto = loadFont("fonts/Roboto-Regular.ttf");
  fonts.fa = loadFont("fonts/fa.otf");
}

function setup() {
  canvasSize = windowHeight;
  cnv = createCanvas(canvasSize, canvasSize);
  cnv.mouseClicked(handleClick)
  style = new Style();
  vizMap = notebookHandler.handle(fake);
  angleMode(DEGREES);
}

function draw() {
  vizMap = notebookHandler.handle(fake);
  const element = vizMap.findElement(mouseX, mouseY) ?
    vizMap.findElement(mouseX, mouseY).element :
    null;
  vizMap.select(element);
  drawCursor(element != null);
  vizMap.render();
}

function handleClick() {
  const {
    element,
    index: layerIndex
  } = vizMap.findElement(mouseX, mouseY);
  vizMap.click(element, layerIndex)
}

function drawCursor(isSelected) {
  cursor(isSelected ? "pointer" : "default");
}

function windowResized() {
  canvasSize = windowHeight;
  resizeCanvas(canvasSize, canvasSize);
}