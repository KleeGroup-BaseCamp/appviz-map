export default class Layer {
  /**
   * Array of {
   *  - {x, y} 
   *  - element
   * }  
   */
  #positionedElements

  constructor(positionedElements) {
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
  findElement(x, y) {
    for (let positionedElement of this.#positionedElements) {
      const lx = x - positionedElement.pxPosition.getX()
      const ly = y - positionedElement.pxPosition.getY()
      if (positionedElement.element.isSelectable() && positionedElement.element.contains(lx, ly))
        return positionedElement.element
    }
    return null
  }
}
