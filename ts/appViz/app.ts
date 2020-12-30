import {HomeView, TechZoneView, TechGroupView} from "./views"
import {DemoViewEnergy, DemoViewGauge, DemoViewBlackHole,  DemoViewChart, 
    DemoViewRating, DemoViewSignal, DemoViewProgressBar, DemoViewRadar, DemoViewDashboard, DemoViewNeon} from "../demo/views"

import * as p5 from "p5"
import {n3on, VEvent} from "../neon"
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
  n3on.buildCanvas(
    'myContainer' /* canvas id of the DOM parent (<DIV>) */,
    updateView)
    const modelRepository = modelRepositoryBuilder.build()

    n3on.registerView( 'demoSignal', (_) => new DemoViewSignal())
    n3on.registerView( 'demoRating', (_) => new DemoViewRating())
    n3on.registerView( 'demoEnergy', (_) => new DemoViewEnergy())
    n3on.registerView( 'demoGauge',  (_) => new DemoViewGauge())
    n3on.registerView( 'demoBlackHole',  (_) => new DemoViewBlackHole())
    n3on.registerView( 'demoProgressBar',  (_) => new DemoViewProgressBar())
    n3on.registerView( 'demoRadar',  (_) => new DemoViewRadar())
    n3on.registerView( 'demoChart',  (_) => new DemoViewChart())
    n3on.registerView( 'demoNeon',  (_) => new DemoViewNeon())
    n3on.registerView( 'demoDashboard',  (_) => new DemoViewDashboard())
    n3on.registerView( 'home',  (_) => new HomeView())

    n3on.registerView( 'techZone',  (_) => new TechZoneView(modelRepository,layout))
    n3on.registerView( 'techGroup',  (viewParams) => new TechGroupView(modelRepository, viewParams))
  
    // go to home
    n3on.execute ("home", "view", {})
}

window.draw = ()=> {
  n3on.draw()
}

window.mouseClicked = (e)=> {
  n3on.mouseClicked(mouseX, mouseY)
}

window.windowResized = ()=> {
  n3on.windowResized()
}

window.execute = (route:string, action:string, params : {[name:string]: string|number|boolean}) => {
  n3on.execute(route, action, params)
}

export {icons}