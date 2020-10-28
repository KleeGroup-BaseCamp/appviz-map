import "p5"
import {} from "p5/global"

import {Detail} from "./detail"
import {HomeView, TechZoneView, TechGroupView, DemoView, View, Group, Item, Background} from "./views"
import {Style, State, MapBuilder, LayerBuilder, Map, VElement} from "./core"
import {ModelRepositoryBuilder, ModelRepository} from "./model"
import {Projection, PxSize} from "./layout"
import {ViewParams} from "./types"

let style: Style
const detail: Detail = new Detail()
const state: State = new State()

let vizMap : Map
let modelRepositoryBuilder : ModelRepositoryBuilder
let modelRepository : ModelRepository
let canvasHeight : number
let canvasWidth : number
let currentViewName : string
let currentViewParams : ViewParams
let projection : Projection 
let layout : any

// Add methods to Window interface
declare global {
    interface Window { 
      preload: any,
      setup: any,
      draw: any,
      switchView: any
     }
}

window.preload = preload
window.setup = setup
window.draw = draw
window.switchView = switchView
window.mouseClicked = mouseClicked
window.windowResized = windowResized

function preload() {
  style = new Style()
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
  if (vizMap){
    const element = vizMap.findElement(mouseX, mouseY)
    if (element){
      state.select(element)
      updateDetail(element)
    }
  }
}

function windowResized() {
  canvasHeight = windowHeight
  canvasWidth = windowWidth * 0.75
  resizeCanvas(canvasWidth, canvasHeight)
  projection = new Projection(new PxSize(canvasWidth, canvasHeight))
  //
  const view = selectView(currentViewName, currentViewParams)
  vizMap = generateMapFromView(view)
  state.reset()
}

/**
 * @param {?VElement} element
 * 
 * Update the detail Panel  
 */
function updateDetail(element: VElement) {
  if (element instanceof Group || element instanceof Item) {
    detail.update(element instanceof Group ? 'group' : 'item', element.getId())
  }
}

function switchView(viewName: string, viewParams?: ViewParams) {
  const hasChanged = (currentViewName !== viewName) || (currentViewParams!==viewParams)
  //--
  currentViewName = viewName
  currentViewParams = viewParams ?? currentViewParams
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
function selectView(viewName: string, viewParams?: ViewParams): View {
  // const clazzName = TextUtils.firstCharUpperCase(viewName)+'View'
  // const jsonParams = JSON.stringify(viewParams)
  // const expression = `new ${clazzName} (${jsonParams} )` 
  // return  eval(expression);
  switch(viewName){
    case "demo":
      return new DemoView()
    case "techZone":
      return new TechZoneView()
    case "techGroup":
      if (viewParams){
        return new TechGroupView(viewParams)
      } else{
        console.error("No viewParams were passed to the function selectView")
      }
    default:
      return new HomeView()
  }
}

function generateMapFromView(viewInstance: View) {
  return new MapBuilder()
    .addLayer(new LayerBuilder().addElement(new Background("background", new PxSize(0,0), false)).build())
    .addLayers(viewInstance.provideLayers(modelRepository, layout))
    //.addLayers(new LayerBuilder().addElement(new Grid(-1, projection.getPxSize(), "12", "12")).build())
    .build()
}


export {style, state, detail, projection}