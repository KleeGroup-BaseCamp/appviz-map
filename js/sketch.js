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
  createCanvas(canvasSize, canvasSize)
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
  const element = vizMap.findElement(mouseX, mouseY)
  vizMap.click(element)
  vizMap = notebookHandler.handle(fake)
}

function windowResized() {
  canvasSize = windowHeight
  resizeCanvas(canvasSize, canvasSize)
}