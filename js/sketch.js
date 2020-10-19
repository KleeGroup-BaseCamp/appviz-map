let vizMap
let modelRepositoryBuilder
let modelRepository
let canvasHeight
let canvasWidth
let view // => viewName must be changed !!
let viewParams
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
  vizMap = generateMap(view, viewParams)
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

function switchView(viewName, params) {
  const hasChanged = view !== viewName
  //
  view = viewName
  viewParams = params
  //
  if (hasChanged) {
    
    const vvview = selectView(viewName, viewParams)
    vizMap = generateMapFromView(vvview)
    state.reset()
  }
}

/**
 * @param {string} viewName 
 * @param {Object} viewParams 
 * @return {View}
 */
function selectView(viewName, viewParams) {
  switch (viewName) {
    case "techZone":
      return new TechZoneView();
    case "techGroup":
      return new TechGroupView(viewParams.groupId);
    case "demo":
      return new DemoView();
    case "home":
      return new HomeView();
    default:
      throw 'View : "' + view + '" is not recognized'
  } 
}

function generateMapFromView(viewInstance) {
  return new MapBuilder()
    .addLayer(new LayerBuilder().addElement(new Background()).build())
    .addLayers(viewInstance.provideLayers(modelRepository, layout))
    //.addLayers(new LayerBuilder().addElement(new Grid(-1, projection.getPxSize(), "12", "12")).build())
    .build()
}
