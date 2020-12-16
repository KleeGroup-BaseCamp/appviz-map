import {ModelRepository} from "./model"
import {HomeView, TechZoneView, TechGroupView} from "./views"
import {DemoViewEnergy, DemoViewGauge, DemoViewBlackHole,  DemoViewChart, 
    DemoViewRating, DemoViewSignal, DemoViewProgressBar, DemoViewRadar, DemoViewDashboard, DemoViewNeon} from "../demo/views"
import {ViewParams, View, VEvent} from "../neon"

import {Group, Item} from "./components"


export class Detail{
    private readonly layout : any
    private readonly modelRepository : ModelRepository

    constructor(modelRepository : ModelRepository, layout : any){
        this.modelRepository = modelRepository
        this.layout = layout
    }

    private update(type: string, id: string): void{
        const detailTitle = document.querySelector("#detail-title")
        const detailContent = document.querySelector("#detail-content")
        if (detailTitle){
            detailTitle.textContent = id
        }
        if (detailContent){
            detailContent.innerHTML = this.getContent(type, id)
        }
    }

    private getContent(type: string, id: any){ 
        if (type === 'group') {
            return `<div class='has-text-centered'><button class='button is-light' id='detail-button' onclick="switchView('techGroup', {'groupId': '${id}'})">Go to detail</button><p>Group detail goes here</p></div>`
        } else {
            return '';
        }
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
        return new TechZoneView(this.modelRepository, this.layout)
      case "techGroup":
        if (! viewParams){
          throw "No viewParams were passed to the function selectView"
        }
        return new TechGroupView(this.modelRepository, this.layout, viewParams)
      default:
        return new HomeView()
    }
  }

    /**
   * @param {?Component} component
   * 
   * Update the detail Panel  
   */
  public updateDetail(event : VEvent): void {
    const component = event.sourceComponent
    if (component instanceof Group || component instanceof Item) {
      const type = component instanceof Group ? 'group' : 'item'
      this.update(type, component.getId()) // TODO: Update to title instead of Id
    }
  }

}