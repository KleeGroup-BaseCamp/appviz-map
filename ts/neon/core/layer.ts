import {VElement, State} from "."
import {PxPosition} from "../layout"
import {AnimationUtils} from "../utils"
import {debug, style} from "../../app"

export type PositionedElement = {pxPosition: PxPosition, element: VElement}

export class Layer {
  private readonly positionedElements: PositionedElement[]

  constructor(positionedElements: PositionedElement[]) {
    this.positionedElements = positionedElements
  }

  public render(state : State) : void  {
    if (debug){
      fill('green'); 
      textSize(30)
      text("Frame rate : " + frameRate(), 50 , 30); 
      text("Animations : " + AnimationUtils.count(), 50 , 50); 
    }  

    for (let positionedElement of this.positionedElements) {
      push()
      translate(positionedElement.pxPosition.getX(), positionedElement.pxPosition.getY())

      if (positionedElement.element.needsClear()){
        noStroke()
        fill(style.color.back)
        rect(0, 0, positionedElement.element.getWidth(), positionedElement.element.getHeight())
      }  
      positionedElement.element.render(state)
      if (debug){
        //-- Green border to check if en element is inside its bounding box
        noFill()
        stroke('green')
        strokeWeight(2)
        rect(0, 0, positionedElement.element.getWidth(), positionedElement.element.getHeight())
        //--
      }
      pop()
    }
  }

  /**
   * Finds the element positionned in (x, y)
   * 
   * @param {number} x 
   * @param {number} y 
   * @returns {?VElement} element 
   */
  public findElement(x: number, y: number): VElement | null {
    for (let positionedElement of this.positionedElements) {
      const lx = x - positionedElement.pxPosition.getX()
      const ly = y - positionedElement.pxPosition.getY()
      if (positionedElement.element.isSelectable() && positionedElement.element.contains(lx, ly))
        return positionedElement.element
    }
    return null
  }
}