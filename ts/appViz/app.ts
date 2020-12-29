import {HomeView, TechZoneView, TechGroupView} from "./views"
import {DemoViewEnergy, DemoViewGauge, DemoViewBlackHole,  DemoViewChart, 
    DemoViewRating, DemoViewSignal, DemoViewProgressBar, DemoViewRadar, DemoViewDashboard, DemoViewNeon} from "../demo/views"

import * as p5 from "p5"
import {n3on, VEvent} from "../neon"
import {Sketch} from "./sketch"
import {ModelRepositoryBuilder} from "./model"
import {Detail} from "./detail"

// Add methods to Window interface
declare global {
    interface Window { 
      preload: any,
      setup: any,
      draw: any,
      execute:any
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
  const detail = new Detail()
  
  const updateView = (event : VEvent)=> {
    detail.updateDetail(event)
  }
  sketch = new Sketch(
    'myContainer' /* canvas id of the DOM parent (<DIV>) */,
    updateView)
    const modelRepository = modelRepositoryBuilder.build()

    sketch.registerView( 'demoSignal', (_) => new DemoViewSignal())
    sketch.registerView( 'demoRating', (_) => new DemoViewRating())
    sketch.registerView( 'demoEnergy', (_) => new DemoViewEnergy())
    sketch.registerView( 'demoGauge',  (_) => new DemoViewGauge())
    sketch.registerView( 'demoBlackHole',  (_) => new DemoViewBlackHole())
    sketch.registerView( 'demoProgressBar',  (_) => new DemoViewProgressBar())
    sketch.registerView( 'demoRadar',  (_) => new DemoViewRadar())
    sketch.registerView( 'demoChart',  (_) => new DemoViewChart())
    sketch.registerView( 'demoNeon',  (_) => new DemoViewNeon())
    sketch.registerView( 'demoDashboard',  (_) => new DemoViewDashboard())
    sketch.registerView( 'home',  (_) => new HomeView())

    sketch.registerView( 'techZone',  (_) => new TechZoneView(modelRepository,layout))
    sketch.registerView( 'techGroup',  (viewParams) => new TechGroupView(modelRepository, viewParams))
  
    // go to home
    sketch.execute ("home", "view", {})
}

window.draw = ()=> {
  sketch.draw()
}

window.mouseClicked = (e)=> {
  sketch.mouseClicked(mouseX, mouseY)
}

window.windowResized = ()=> {
  sketch.windowResized()
}

window.execute = (route:string, action:string, params : {[name:string]: string|number|boolean}) => {
  sketch.execute(route, action, params)
}

export {sketch, icons}