let vizMap
let notebookHandler
let modelBuilder
let modelRepository
let dispatcher
let fake
let canvasHeight
let canvasWidth
let view = "home"
let groupId = ""
const style = new Style()
const detail = new Detail()
const state = new State()

function preload() {
  canvasHeight = windowHeight
  canvasWidth = windowWidth * 0.75
  notebookHandler = new NotebookHandler("./notebook.json")
  modelBuilder = new ModelBuilder("./notebook.json", "./config.json")
  dispatcher = new Dispatcher("./layout.json")
  fake = loadJSON("./fake.json")
  style.load()
}

function setup() {
  let myCanvas = createCanvas(canvasWidth, canvasHeight)
  myCanvas.parent('myContainer')
  angleMode(DEGREES)
  vizMap = notebookHandler.handle(fake)
  modelRepository = modelBuilder.buildModelRepository() 
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

// function switchViews(title){
//   view = title.toLowerCase()
// }

function switchZoneGroup(title){
  if (title == "zone"){
    view = view.slice(0,4) + "Zone" // Depends on "tech".length == "func".length
  } else{
    view = view.slice(0,4) + "Group"
    groupId = title
  }
}

["home", "tech", "func", "demo"].forEach((viewName)=>{
  document.getElementById(viewName).addEventListener("click", ()=>{
    view = viewName + (viewName == "tech" || viewName == "func" ? "Zone" : "")
  });

})