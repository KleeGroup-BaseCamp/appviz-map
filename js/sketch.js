let vizMap
let notebookHandler
let fake
let canvasSize
let group = false // temp variable
const style = new Style()
let idCount = 0
const state = new State()

function preload() {
  notebookHandler = new NotebookHandler("./notebook.json")
  fake = loadJSON("./fake.json")
  style.load()
}

function setup() {
  canvasSize = windowHeight
  createCanvas(canvasSize, canvasSize)
  angleMode(DEGREES)
  vizMap = notebookHandler.handle(fake)
  vizMap.render()
}

function draw() {
  const element = vizMap.findElement(mouseX, mouseY)
  vizMap.select(element)
  //--- cursor
  const isSelected = element != null
  cursor(isSelected ? "pointer" : "default")
  //--- render
  if (state.changed) {
    vizMap.render()
    state.changed = false
  }
}

function mouseClicked() {
  const element = vizMap.findElement(mouseX, mouseY)
  vizMap.click(element)
  // Build map on click only
  vizMap = notebookHandler.handle(fake);
}

function windowResized() {
  canvasSize = windowHeight
  resizeCanvas(canvasSize, canvasSize)
}