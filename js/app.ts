import {Style, StyleBuilder} from "./core"
import {Projection} from "./layout"
import {ViewParams} from "./types"
import {Sketch} from "./sketch"
import { ModelRepositoryBuilder } from "./model"

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
let sketch : Sketch
let style  : Style 
let projection : Projection
let modelRepositoryBuilder : ModelRepositoryBuilder 
let layout : any


window.preload = () => {
  modelRepositoryBuilder = new ModelRepositoryBuilder("/data/notebook.json", "/data/config.json")
  layout = loadJSON("/js/views/layout.json")
  styleBuilder.load()
  projection = Projection.buildProjection()
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

export {sketch, style, projection}