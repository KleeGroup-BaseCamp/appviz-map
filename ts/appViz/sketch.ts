import "p5"
import {} from "p5/global"
import {ViewParams, PxSize, View, State, MapBuilder, LayerBuilder, Map, VEvent, Background, AnimationUtils, isThemeName, n3on} from "../neon"

export class Sketch {
  private readonly viewDispatcher : (viewName: string, viewParams?: ViewParams)=> View
  private readonly eventHandler : (event : VEvent)=> void
  private readonly state: State = new State()
  private vizMap? : Map
  private currentViewName? : string
  private currentViewParams? : ViewParams

  constructor(
      domId : string, 
      eventHandler: (event : VEvent)=> void, 
      viewDispatcher :(viewName: string, viewParams?: ViewParams)=> View){
    this.viewDispatcher = viewDispatcher
    this.eventHandler = eventHandler

    const canvasHeight = windowHeight
    const canvasWidth = windowWidth * 0.75
    let myCanvas = createCanvas(canvasWidth, canvasHeight)
    myCanvas.parent(domId)
  }

  public draw():void  {
    if (!this.vizMap){
      throw 'vizMap must be defined'
    }  
    const component = this.vizMap.findComponent(mouseX, mouseY)
    this.state.hover(component)
    cursor(component != null ? "pointer" : "default")
    if (this.state.isActive()) {
      this.vizMap.render(this.state)
    }
  }
  
  private emit(event : VEvent): void{
    this.state.select(event.sourceComponent)
    this.eventHandler(event)
  }

  public mouseClicked(x: number, y:number): void  {
    if (this.vizMap){
      const component = this.vizMap.findComponent(x, y)
      if (component) {
        const event : VEvent = {
          sourceComponent : component,
          action : 'click'        
        }  
        this.emit (event)
      }
    }
  }

  public windowResized(): void {
    const canvasHeight = windowHeight
    const canvasWidth = windowWidth * 0.75
    resizeCanvas(canvasWidth, canvasHeight)
    this.drawView()
  }
 
  public switchView(viewName: string, viewParams?: ViewParams): void {
    const hasChanged = (this.currentViewName !== viewName) || (this.currentViewParams!==viewParams)
    //--
    this.currentViewName = viewName
    this.currentViewParams = viewParams ?? this.currentViewParams
    //--
    if (hasChanged) {
      AnimationUtils.clearAll()
      this.drawView()
    }
  }

  public switchTheme(themeName: string){
    if (! isThemeName(themeName)){
      throw `${themeName} not known as a theme name`
    }
    n3on.setTheme(themeName)
    this.drawView()
  }

  public switchDebug(){
    n3on.setDebug(!n3on.getDebug())
    this.drawView()
    }

  public drawView():void{
    if (!this.currentViewName){
      throw 'currentViewName must be defined'
    } 
    const view = this.viewDispatcher(this.currentViewName, this.currentViewParams)
    this.vizMap = this.buildMap(view)
    this.state.reset()
  }

  private buildMap(viewInstance: View): Map {
    return new MapBuilder()
      .addLayer(new LayerBuilder().addComponent(new Background({size: new PxSize(width,height)})).build())
      .addLayers(viewInstance.provideLayers())
      //.addLayers(new LayerBuilder().addComponent(new Grid(-1, projection.getPxSize(), "12", "12")).build())
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
