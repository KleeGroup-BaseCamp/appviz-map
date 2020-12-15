import {ViewParams, n3on} from "../neon"
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
let sketch : Sketch
let modelRepositoryBuilder : ModelRepositoryBuilder 
let layout : any
let icons : {[iconName: string]: p5.Image} = {} 


window.preload = () => {
  modelRepositoryBuilder = new ModelRepositoryBuilder("/data/notebook.json", "/data/config.json")
  layout = loadJSON("/ts/appViz/views/layout.json")
  n3on.load()
  icons.heart = loadImage('icons/heart.png')
  icons.star = loadImage('icons/star.png')
}

window.setup = ()=> {
  sketch = new Sketch(modelRepositoryBuilder.build(), layout)
  // go to home
  sketch.switchView("home")
}

window.draw = ()=> {sketch.draw()}

window.mouseClicked = (e)=> {sketch.mouseClicked(mouseX, mouseY)}
  window.windowResized = ()=> {
  sketch.windowResized()
}

window.switchView = (viewName: string, viewParams?: ViewParams): void => {sketch.switchView(viewName, viewParams)}
window.switchTheme = (themeName: string) => {sketch.switchTheme(themeName)}
window.switchDebug = () => {
  n3on.setDebug(!n3on.getDebug()) // toggleDebug method ?
  sketch.drawView()
}

export {sketch, icons}