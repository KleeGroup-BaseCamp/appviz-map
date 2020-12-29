import {ModelRepository} from "./model"
import {HomeView, TechZoneView, TechGroupView} from "./views"
import {DemoViewEnergy, DemoViewGauge, DemoViewBlackHole,  DemoViewChart, 
    DemoViewRating, DemoViewSignal, DemoViewProgressBar, DemoViewRadar, DemoViewDashboard, DemoViewNeon} from "../demo/views"
import {ViewManager, ViewParams, View, VEvent} from "../neon"

import {Group, Item} from "./components"


export class Detail{
    private viewManager : ViewManager

    constructor(modelRepository : ModelRepository, layout : any){
      this.viewManager = new ViewManager()
      this.regiserAllViews(modelRepository, layout)
    }

    private regiserAllViews(modelRepository : ModelRepository, layout : any):void {
      this.viewManager.register( 'demoSignal', (_) => new DemoViewSignal())
      this.viewManager.register( 'demoRating', (_) => new DemoViewRating())
      this.viewManager.register( 'demoEnergy', (_) => new DemoViewEnergy())
      this.viewManager.register( 'demoGauge',  (_) => new DemoViewGauge())
      this.viewManager.register( 'demoBlackHole',  (_) => new DemoViewBlackHole())
      this.viewManager.register( 'demoProgressBar',  (_) => new DemoViewProgressBar())
      this.viewManager.register( 'demoRadar',  (_) => new DemoViewRadar())
      this.viewManager.register( 'demoChart',  (_) => new DemoViewChart())
      this.viewManager.register( 'demoNeon',  (_) => new DemoViewNeon())
      this.viewManager.register( 'demoDashboard',  (_) => new DemoViewDashboard())
      this.viewManager.register( 'home',  (_) => new HomeView())

      this.viewManager.register( 'techZone',  (_) => new TechZoneView(modelRepository,layout))
      this.viewManager.register( 'techGroup',  (viewParams) => new TechGroupView(modelRepository, viewParams))
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
            return `<div class='has-text-centered'><button class='button is-light' id='detail-button' onclick="execute('techGroup','view', {'groupId': '${id}'})">Go to detail</button><p>Group detail goes here</p></div>`
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
    return this.viewManager.display(viewName,  viewParams)
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