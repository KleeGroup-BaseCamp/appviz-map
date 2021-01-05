import {Component, State} from "."
import {AnimationUtils} from "../utils"
import {n3on} from "../../neon"
import * as p5 from "p5"

export type PositionedComponent = {pxPosition: p5.Vector, component: Component}

export class Layer {
  private readonly positionedComponents: PositionedComponent[]

  constructor(positionedComponents: PositionedComponent[]) {
    this.positionedComponents = positionedComponents
  }

  public render(state : State) : void  {
    if (n3on.getDebug()){
      fill('green'); 
      textSize(30)
      text("Frame rate : " + frameRate(), 50 , 30); 
      text("Animations : " + AnimationUtils.count(), 50 , 50); 
    }  

    for (let positionedComponent of this.positionedComponents) {
      push()
      translate(positionedComponent.pxPosition)

      if (positionedComponent.component.needsClear()){
        noStroke()
        fill(n3on.getStyle().color.back)
        rect(0, 0, positionedComponent.component.getWidth(), positionedComponent.component.getHeight())
      }  
      positionedComponent.component.render(state)
      if (n3on.getDebug()){
        //-- Green border to check if en component is inside its bounding box
        noFill()
        stroke('green')
        strokeWeight(2)
        rect(0, 0, positionedComponent.component.getWidth(), positionedComponent.component.getHeight())
        //--
      }
      pop()
    }
  }

  /**
   * Finds the component positionned in (x, y)
   * 
   * @param {number} x 
   * @param {number} y 
   * @returns {?Component} component 
   */
  public findComponent(x: number, y: number): Component | null {
    for (let positionedComponent of this.positionedComponents) {
      if (positionedComponent.component.isSelectable()) {
        const lx = x - positionedComponent.pxPosition.x
        const ly = y - positionedComponent.pxPosition.y
        if (positionedComponent.component.contains(lx, ly)){
          return positionedComponent.component
        }  
      }
    }
    return null
  }
}
