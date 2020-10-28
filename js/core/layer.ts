import {VElement} from "./velement"
import {PositionedElement} from "../types"

export class Layer {
  private readonly positionedElements: PositionedElement[]

  constructor(positionedElements: PositionedElement[]) {
    this.positionedElements = positionedElements
  }

  public render() : void  {
    for (let positionedElement of this.positionedElements) {
      push()
      translate(positionedElement.pxPosition.getX(), positionedElement.pxPosition.getY())
      positionedElement.element.render()
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
