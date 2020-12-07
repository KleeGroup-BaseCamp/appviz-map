import "p5"
import {} from "p5/global"

import {projection} from "./app"
import {Detail} from "./detail"
import {HomeView, TechZoneView, TechGroupView, DemoViewEnergy, DemoViewGauge, DemoViewBlackHole,  DemoViewChart, DemoViewRating, DemoViewSignal, DemoViewProgressBar, DemoViewRadar, DemoViewDashboard} from "./views"
import {State, MapBuilder, LayerBuilder, Map, VElement, VEvent, Group, Item, Background} from "./neon"
import {ModelRepository} from "./model"
import {Projection, PxSize} from "./neon"
import {ViewParams} from "./types"
import {View } from "./views/View"
import {DemoViewNeon } from "./views/demoViewNeon"

export class Sketch {
  private readonly state: State = new State()
  private readonly detail: Detail = new Detail()

  private vizMap? : Map
  private readonly modelRepository : ModelRepository
  private currentViewName? : string
  private currentViewParams? : ViewParams
  private readonly layout : any

  constructor(modelRepository : ModelRepository, projection : Projection, layout : any){
    let myCanvas = createCanvas(projection.getPxSize().getWidth(), projection.getPxSize().getHeight())
    myCanvas.parent('myContainer')
    this.layout = layout
    this.modelRepository = modelRepository
  }

  public draw():void  {
    if (!this.vizMap){
      throw 'vizMap must be defined'
    }  
    const element = this.vizMap.findElement(mouseX, mouseY)
    this.state.hover(element)
    cursor(element != null ? "pointer" : "default")
    if (this.state.isActive()) {
      this.vizMap.render(this.state)
    }
  }
  
  private emit(event : VEvent): void{
    this.state.select(event.sourceElement)
    this.updateDetail(event.sourceElement)
  }

  public mouseClicked(x: number, y:number): void  {
    if (this.vizMap){
      const element = this.vizMap.findElement(x, y)
      if (element) {
        const event : VEvent = {
          sourceElement : element,
          action : 'click'        
        }  
        this.emit (event)
      }
    }
  }

  public windowResized(): void {
    resizeCanvas(projection.getPxSize().getWidth(), projection.getPxSize().getHeight())
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
      this.detail.update(type, element.getId()) // TODO: Update to title instead of Id
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
  public drawView():void{
    if (!this.currentViewName){
      throw 'currentViewName must be defined'
    } 
    const view = this.selectView(this.currentViewName, this.currentViewParams)
    this.vizMap = this.generateMapFromView(view)
    this.state.reset()
  }

  /**
   * @param {string} viewName 
   * @param {Object} viewParams 
   * @return {View}
   */
  private selectView(viewName: string, viewParams?: ViewParams): View {
    // const clazzName = TextUtils.firstCharUpperCase(viewName)+'View'
    // const jsonParams = JSON.stringify(viewParams)
    // const expression = `new ${clazzName} (${jsonParams} )` 
    // return  eval(expression);
    switch(viewName){
      case "demoSignal":
        return new DemoViewSignal()
      case "demoRating":
        return new DemoViewRating()
      case "demoEnergy":
        return new DemoViewEnergy()
      case "demoGauge":
        return new DemoViewGauge()
      case "demoBlackHole":
        return new DemoViewBlackHole()
      case "demoProgressBar":
        return new DemoViewProgressBar()
      case "demoRadar":
        return new DemoViewRadar()
      case "demoChart":
        return new DemoViewChart()
      case "demoNeon":
        return new DemoViewNeon()
      case "demoDashboard":
        return new DemoViewDashboard()
      case "techZone":
        return new TechZoneView()
      case "techGroup":
        if (! viewParams){
          throw "No viewParams were passed to the function selectView"
        }
        return new TechGroupView(viewParams)
      default:
        return new HomeView()
    }
  }

  private generateMapFromView(viewInstance: View): Map {
    return new MapBuilder()
      .addLayer(new LayerBuilder().addElement(new Background({size: new PxSize(width,height)})).build())
      .addLayers(viewInstance.provideLayers(this.modelRepository, this.layout))
      //.addLayers(new LayerBuilder().addElement(new Grid(-1, projection.getPxSize(), "12", "12")).build())
      .build()
  }
}

/*
export type VEventHandler = (event : VEvent) =>{}
export type VEventDispatcher = {[topic:string]:VEventHandler}
  private readonly eventDispatcher : VEventDispatcher = {}
public registerEventHandler(eventHandler : VEventHandler){
  this.eventHandler = eventHandler
}

public onEvent(event : VEvent): void {
  if (! this.eventHandler){
    throw 'no eventHandler registered'
  }
  this.eventHandler(event)
}
*/