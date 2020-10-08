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
  state.select(element)
  //--- cursor
  const isSelected = element != null
  cursor(isSelected ? "pointer" : "default")
  //--- render
    vizMap.render()
}

function mouseClicked() {
  const element = vizMap.findElement(mouseX, mouseY)
  vizMap.click(element)
  vizMap = notebookHandler.handle(fake)
}

function windowResized() {
  canvasSize = windowHeight
  resizeCanvas(canvasSize, canvasSize)
}