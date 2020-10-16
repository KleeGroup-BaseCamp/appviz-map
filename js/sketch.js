let vizMap
let modelRepositoryBuilder
let modelRepository
let dispatcher
let canvasHeight
let canvasWidth
let view = "home"
let groupId = null
const style = new Style()
const detail = new Detail()
const state = new State()

function preload() {
  canvasHeight = windowHeight
  canvasWidth = windowWidth * 0.75
  modelRepositoryBuilder = new ModelRepositoryBuilder("./notebook.json", "./config.json")
  dispatcher = new Dispatcher("./layout.json")
  style.load()
}

function setup() {
  let myCanvas = createCanvas(canvasWidth, canvasHeight)
  myCanvas.parent('myContainer')
  angleMode(DEGREES)
  modelRepository = modelRepositoryBuilder.build() 
  vizMap = generateMap(view)
}

function draw() {
  const element = vizMap.findElement(mouseX, mouseY)
  
  state.hover(element)
  cursor(element != null ? "pointer" : "default")

  if (state.isActive()){
    vizMap.render()
  }
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
  vizMap = generateMap(view)
}

function generateMap(view){
  if (view == "techZone") {
    return dispatcher.generateZoneViewMap(true)
  } else if (view == "techGroup"){
    return dispatcher.generateGroupViewMap(groupId, true)
  } else if (view == "funcZone"){
    return dispatcher.generateZoneViewMap(false)
  } else if (view == "funcGroup"){
    return dispatcher.generateGroupViewMap(groupId, false)
  } else if(view == "demo"){
      return dispatcher.generateDemoViewMap()
  } else {
    return dispatcher.generateHomeViewMap()
  }
}

function windowResized() {
  canvasHeight = windowHeight
  canvasWidth = windowWidth * 0.75
  resizeCanvas(canvasWidth, canvasHeight)
}
// Temp
function switchZoneGroup(title){
  if (title == "zone"){
    view = view.slice(0,4) + "Zone" // Depends on "tech".length == "func".length
  } else{
    view = view.slice(0,4) + "Group"
    groupId = title
  }
}

// Temp
["home", "tech", "func", "demo"].forEach((viewName)=>{
  document.getElementById(viewName).addEventListener("click", ()=>{
    view = viewName + (viewName == "tech" || viewName == "func" ? "Zone" : "")
  });
})



