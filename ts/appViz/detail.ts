import {VEvent} from "../neon"
import {Group, Item} from "./components"

export class Detail{
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