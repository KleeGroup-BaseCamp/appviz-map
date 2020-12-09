import {Neon, StyleBuilder,Projection} from "../neon"
import {ViewParams} from "./types"
import {Sketch} from "./sketch"
import {ModelRepositoryBuilder} from "./model"
import * as p5 from "p5"

// Add methods to Window interface
declare global {
    interface Window { 
      preload: any,
      setup: any,
      draw: any,
      switchView: any
      switchTheme: any
      switchDebug: ()=> void
     }
}

const styleBuilder : StyleBuilder = new StyleBuilder()   
let sketch : Sketch
let neon  : Neon
let projection : Projection
let modelRepositoryBuilder : ModelRepositoryBuilder 
let layout : any
let icons : {[iconName: string]: p5.Image} = {} 


window.preload = () => {
  modelRepositoryBuilder = new ModelRepositoryBuilder("/data/notebook.json", "/data/config.json")
  layout = loadJSON("/ts/appViz/views/layout.json")
  styleBuilder.load()
  projection = Projection.buildProjection()
  icons.heart = loadImage('icons/heart.png')
  icons.star = loadImage('icons/star.png')
}

window.setup = ()=> {
  const isThemeDark = true // Start theme
  neon = new Neon(styleBuilder, isThemeDark)
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
window.switchTheme = () => {
  neon.switchTheme()
  sketch.drawView()
}
window.switchDebug = () => {
  neon.setDebug(!neon.getDebug()) // toggleDebug method ?
  sketch.drawView()
}

export {sketch, neon, projection, icons}