import {Style, StyleBuilder} from "./core"
import {Projection} from "./layout"
import {ViewParams} from "./types"
import {Sketch} from "./sketch"
import { ModelRepositoryBuilder } from "./model"
import * as p5 from "p5"

// Add methods to Window interface
declare global {
    interface Window { 
      preload: any,
      setup: any,
      draw: any,
      switchView: any
      switchDebug: ()=> void
     }
}

const styleBuilder : StyleBuilder = new StyleBuilder()   
let debug : boolean = true
let sketch : Sketch
let style  : Style 
let projection : Projection
let modelRepositoryBuilder : ModelRepositoryBuilder 
let layout : any
let icons : {[iconName: string]: p5.Image} = {} 


window.preload = () => {
  modelRepositoryBuilder = new ModelRepositoryBuilder("/data/notebook.json", "/data/config.json")
  layout = loadJSON("/js/views/layout.json")
  styleBuilder.load()
  projection = Projection.buildProjection()
  icons.heart = loadImage('icons/heart.png')
  icons.star = loadImage('icons/star.png')
}

window.setup = ()=> {
  style = styleBuilder.build()
  sketch = new Sketch(modelRepositoryBuilder.build(), projection, layout)
  // go to home
  sketch.switchView("home")

}
window.draw = ()=> {sketch.draw()}
window.mouseClicked = (e)=> {sketch.mouseClicked(mouseX, mouseY)}
window.windowResized = ()=> {
  projection = Projection.buildProjection()
  sketch.windowResized()
}
window.switchView = (viewName: string, viewParams?: ViewParams): void => {sketch.switchView(viewName, viewParams)}
window.switchDebug = () => {debug = !debug}

export {sketch, style, projection, icons, debug}