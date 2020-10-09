let vizMap
let notebookHandler
let fake
let canvasSize
let group = false // temp variable
const style = new Style()
let idCount = 0
const state = new State()

function preload() {
  canvasSize = windowHeight
  notebookHandler = new NotebookHandler("./notebook.json")
  fake = loadJSON("./fake.json")
  style.load()
}

function setup() {
  let myCanvas = createCanvas(canvasSize, canvasSize)
  myCanvas.parent('myContainer');
  angleMode(DEGREES)
  vizMap = notebookHandler.handle(fake)
  vizMap.render()
}

function draw() {
  const element = vizMap.findElement(mouseX, mouseY)
  state.select(element)
  cursor(element != null ? "pointer" : "default")
  vizMap.render()
}

function mouseClicked() {
  vizMap.click(state.selectedElement)
  vizMap = notebookHandler.handle(fake)
}

function windowResized() {
  canvasSize = windowHeight
  resizeCanvas(canvasSize, canvasSize)
  vizMap = notebookHandler.handle(fake)
}