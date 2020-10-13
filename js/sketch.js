let vizMap
let notebookHandler
let fake
let canvasHeight
let canvasWidth
let view = "zones"
const style = new Style()
const detail = new Detail()
const state = new State()

function preload() {
  canvasHeight = windowHeight
  canvasWidth = windowWidth * 0.75
  notebookHandler = new NotebookHandler("./notebook.json")
  fake = loadJSON("./fake.json")
  style.load()
}

function setup() {
  let myCanvas = createCanvas(canvasWidth, canvasHeight)
  myCanvas.parent('myContainer');
  angleMode(DEGREES)
  vizMap = notebookHandler.handle(fake)
}

function draw() {
  const element = vizMap.findElement(mouseX, mouseY)
  state.hover(element)
  cursor(element != null ? "pointer" : "default")
  vizMap.render()
}

function mouseClicked() {
  const element = vizMap.findElement(mouseX, mouseY)
  state.select(element);
  onClick(element)
}

/**
 * @param {?Element} element
 * 
 * Change the view (controlled by the group var) 
 * depending on the element clicked ad the current view 
 */
function onClick(element) {
  if (element instanceof Group || element instanceof Item) {
    detail.update(element.getId())
  }
  vizMap = notebookHandler.handle(fake) 
}

function windowResized() {
  canvasHeight = windowHeight
  canvasWidth = windowWidth * 0.75
  resizeCanvas(canvasWidth, canvasHeight)
}

function switchViews(title){
  view = title.toLowerCase()
}
