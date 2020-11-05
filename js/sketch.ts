import "p5"
import {} from "p5/global"

import {Detail} from "./detail"
import {HomeView, TechZoneView, TechGroupView, DemoView, View, Group, Item, Background} from "./views"
import {Style, StyleBuilder, State, MapBuilder, LayerBuilder, Map, VElement} from "./core"
import {ModelRepositoryBuilder, ModelRepository} from "./model"
import {Projection, PxSize} from "./layout"
import {ViewParams} from "./types"

export class Sketch {
  projection : Projection 

  private readonly state: State = new State()
  private readonly detail: Detail = new Detail()

  private vizMap : Map
  private modelRepositoryBuilder? : ModelRepositoryBuilder
  private modelRepository? : ModelRepository
  private currentViewName? : string
  private currentViewParams? : ViewParams
  private layout : any

  constructor(){}

  public preload(): void  {
    this.modelRepositoryBuilder = new ModelRepositoryBuilder("/data/notebook.json", "/data/config.json")
    this.layout = loadJSON("/js/views/layout.json")

    this.projection = this.buildProjection()
  }

  public setup(): void {
    let myCanvas = createCanvas(this.projection.getPxSize().getWidth(), this.projection.getPxSize().getHeight())
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
      this.vizMap.render(this.state)
    }
  }

  public mouseClicked(x: number, y:number): void  {
    if (this.vizMap){
      const element = this.vizMap.findElement(x, y)
      if (element){
        this.state.select(element)
        this.updateDetail(element)
      }
    }
  }
  private buildProjection(): Projection{
    const canvasHeight = windowHeight
    const canvasWidth = windowWidth * 0.75
    return  new Projection(new PxSize(canvasWidth, canvasHeight))
  }

  public windowResized(): void {
    this.projection = this.buildProjection()
    resizeCanvas(this.projection.getPxSize().getWidth(), this.projection.getPxSize().getHeight())
    this.drawView()
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
      this.drawView()
    }
  }
  private drawView():void{
    const view = this.selectView(this.currentViewName, this.currentViewParams)
    this.vizMap = this.generateMapFromView(view)
    this.state.reset()
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


const styleBuilder : StyleBuilder = new StyleBuilder()   
const sketch : Sketch = new Sketch()
let style  : Style 


window.preload = () => {
  styleBuilder.load()
  sketch.preload()
}
window.setup = ()=> {
  style = styleBuilder.build()
  sketch.setup()
}
window.draw = ()=> {sketch.draw()}
window.mouseClicked = (e)=> {sketch.mouseClicked(mouseX, mouseY)}
window.windowResized = ()=> {sketch.windowResized()}
window.switchView = (viewName: string, viewParams?: ViewParams): void => {sketch.switchView(viewName, viewParams)}

export {style, sketch}