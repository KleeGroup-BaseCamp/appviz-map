import { PositionedElement } from "../types/types"
import VElement from "./element"

export default class Layer {
  

  #positionedElements: PositionedElement[]

  constructor(positionedElements: PositionedElement[]) {
    this.#positionedElements = positionedElements
  }

  render() {
    for (let positionedElement of this.#positionedElements) {
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
  findElement(x: number, y: number): VElement | null {
    for (let positionedElement of this.#positionedElements) {
      const lx = x - positionedElement.pxPosition.getX()
      const ly = y - positionedElement.pxPosition.getY()
      if (positionedElement.element.isSelectable() && positionedElement.element.contains(lx, ly))
        return positionedElement.element
    }
    return null
  }
}
