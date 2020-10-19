let vizMap
let modelRepositoryBuilder
let modelRepository
let canvasHeight
let canvasWidth
let currentViewName
let currentViewParams
const style = new Style()
const detail = new Detail()
const state = new State()
let layout
let projection

function preload() {
  canvasHeight = windowHeight
  canvasWidth = windowWidth * 0.75
  modelRepositoryBuilder = new ModelRepositoryBuilder("/data/notebook.json", "/data/config.json")
  layout = loadJSON("/js/views/layout.json")
  projection = new Projection(new PxSize(canvasWidth, canvasHeight))
  style.load()
}

function setup() {
  let myCanvas = createCanvas(canvasWidth, canvasHeight)
  myCanvas.parent('myContainer')
  angleMode(DEGREES)
  modelRepository = modelRepositoryBuilder.build()
  // go to home
  switchView("home")
}

function draw() {
  const element = vizMap.findElement(mouseX, mouseY)

  state.hover(element)
  cursor(element != null ? "pointer" : "default")

  if (state.isActive()) {
    vizMap.render()
  }
}
function mouseClicked() {
  const element = vizMap.findElement(mouseX, mouseY)
  state.select(element);
  updateDetail(element)
}

function windowResized() {
  canvasHeight = windowHeight
  canvasWidth = windowWidth * 0.75
  resizeCanvas(canvasWidth, canvasHeight)
  projection = new Projection(new PxSize(canvasWidth, canvasHeight))
  //
  vizMap = generateMap(currentViewName, currentViewParams)
  state.reset()
}

/**
 * @param {?Element} element
 * 
 * Update the detail Panel  
 */
function updateDetail(element) {
  if (element instanceof Group || element instanceof Item) {
    detail.update(element instanceof Group ? 'group' : 'item', element.getId())
  }
}

function switchView(viewName, viewParams) {
  const hasChanged = (currentViewName !== viewName) || (currentViewParams!==viewParams)
  //--
  currentViewName = viewName
  currentViewParams = viewParams
  //--
  if (hasChanged) {
    const view = selectView(viewName, viewParams)
    vizMap = generateMapFromView(view)
    state.reset()
  }
}

/**
 * @param {string} viewName 
 * @param {Object} viewParams 
 * @return {View}
 */
function selectView(viewName, viewParams) {
  const clazzName = TextUtils.firstCharUpperCase(viewName)+'View'
  const jsonParams = JSON.stringify(viewParams)
  const expression = `new ${clazzName} (${jsonParams} )` 
  return  eval(expression);
}

function generateMapFromView(viewInstance) {
  return new MapBuilder()
    .addLayer(new LayerBuilder().addElement(new Background()).build())
    .addLayers(viewInstance.provideLayers(modelRepository, layout))
    //.addLayers(new LayerBuilder().addElement(new Grid(-1, projection.getPxSize(), "12", "12")).build())
    .build()
}
