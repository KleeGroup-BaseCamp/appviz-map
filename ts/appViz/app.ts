import {n3on, Projection} from "../neon"
import {ViewParams} from "./types"
import {Sketch} from "./sketch"
import {ModelRepositoryBuilder} from "./model"
import * as p5 from "p5"

console.log("start")
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
let projection : Projection
let modelRepositoryBuilder : ModelRepositoryBuilder 
let layout : any
let icons : {[iconName: string]: p5.Image} = {} 


window.preload = () => {
  console.log("got here")
  modelRepositoryBuilder = new ModelRepositoryBuilder("/data/notebook.json", "/data/config.json")
  layout = loadJSON("/ts/appViz/views/layout.json")
  n3on.load()
  projection = Projection.buildProjection()
  icons.heart = loadImage('icons/heart.png')
  icons.star = loadImage('icons/star.png')
}

window.setup = ()=> {
  console.log("setup")
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
window.switchTheme = (themeName: string) => {sketch.switchTheme(themeName)}
window.switchDebug = () => {
  n3on.setDebug(!n3on.getDebug()) // toggleDebug method ?
  sketch.drawView()
}

export {sketch, projection, icons}