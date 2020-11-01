import "p5"
import {} from "p5/global"

import {Detail} from "./detail"
import {HomeView, TechZoneView, TechGroupView, DemoView, View, Group, Item, Background} from "./views"
import {Style, StyleBuilder, State, MapBuilder, LayerBuilder, Map, VElement} from "./core"
import {ModelRepositoryBuilder, ModelRepository} from "./model"
import {Projection, PxSize} from "./layout"
import {ViewParams} from "./types"


export class Sketch {
  static readonly sketch: Sketch = new Sketch()

  style: Style
  private readonly detail: Detail = new Detail()
  readonly state: State = new State()
  
  private vizMap : Map
  private modelRepositoryBuilder? : ModelRepositoryBuilder
  private modelRepository? : ModelRepository
  private canvasHeight : number
  private canvasWidth : number
  private currentViewName : string
  private currentViewParams : ViewParams
  projection : Projection 
  private layout : any

  constructor(){} 

  public preload(): void  {
    this.style = new StyleBuilder()
      .load()
      .build()
    this.canvasHeight = windowHeight
    this.canvasWidth = windowWidth * 0.75
    this.modelRepositoryBuilder = new ModelRepositoryBuilder("/data/notebook.json", "/data/config.json")
    this.layout = loadJSON("/js/views/layout.json")
    this.projection = new Projection(new PxSize(this.canvasWidth, this.canvasHeight))
  }

  public setup(): void {
    let myCanvas = createCanvas(this.canvasWidth, this.canvasHeight)
    myCanvas.parent('myContainer')
    angleMode(DEGREES)
    this.modelRepository = this.modelRepositoryBuilder.build()
    // go to home
    this.switchView("home")
  }

  public draw():void  {
    const element = this.vizMap.findElement(mouseX, mouseY)
    this.state.hover(element)
    cursor(element != null ? "pointer" : "default")
    if (this.state.isActive()) {
      this.vizMap.render()
    }
  }
  public mouseClicked(): void  {
    console.log ('clicked')
    if (this.vizMap){
      const element = this.vizMap.findElement(mouseX, mouseY)
      if (element){
        this.state.select(element)
        this.updateDetail(element)
      }
    }
  }

  public windowResized(): void {
    this.canvasHeight = windowHeight
    this.canvasWidth = windowWidth * 0.75
    resizeCanvas(this.canvasWidth, this.canvasHeight)
    this.projection = new Projection(new PxSize(this.canvasWidth, this.canvasHeight))
    //
    const view = this.selectView(this.currentViewName, this.currentViewParams)
    this.vizMap = this.generateMapFromView(view)
    this.state.reset()
  }

  /**
   * @param {?VElement} element
   * 
   * Update the detail Panel  
   */
  private updateDetail(element: VElement): void {
    if (element instanceof Group || element instanceof Item) {
      const type = element instanceof Group ? 'group' : 'item'
      this.detail.update(type, element.getId())
    }
  }

  public switchView(viewName: string, viewParams?: ViewParams): void {
    const hasChanged = (this.currentViewName !== viewName) || (this.currentViewParams!==viewParams)
    //--
    this.currentViewName = viewName
    this.currentViewParams = viewParams ?? this.currentViewParams
    //--
    if (hasChanged) {
      const view = this.selectView(viewName, viewParams)
      this.vizMap = this.generateMapFromView(view)
      this.state.reset()
    }
  }

  /**
   * @param {string} viewName 
   * @param {Object} viewParams 
   * @return {View}
   */
  public selectView(viewName: string, viewParams?: ViewParams): View {
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

  private generateMapFromView(viewInstance: View): Map {
    return new MapBuilder()
      .addLayer(new LayerBuilder().addElement(new Background("background", new PxSize(0,0), false)).build())
      .addLayers(viewInstance.provideLayers(this.modelRepository, this.layout))
      //.addLayers(new LayerBuilder().addElement(new Grid(-1, projection.getPxSize(), "12", "12")).build())
      .build()
  }
}

// Add methods to Window interface
declare global {
    interface Window { 
      preload: any,
      setup: any,
      draw: any,
      switchView: any
     }
}
  
const sketch : Sketch = new Sketch()
window.preload = () => {sketch.preload()}
window.setup = ()=> {sketch.setup()}
window.draw = ()=> {sketch.draw()}
window.mouseClicked = (e)=> {sketch.mouseClicked()}
window.windowResized = ()=> {sketch.windowResized()}
window.switchView = (viewName: string, viewParams?: ViewParams): void => {sketch.switchView(viewName, viewParams)}

export {sketch}