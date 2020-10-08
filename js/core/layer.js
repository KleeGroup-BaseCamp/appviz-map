class Layer {
  /**
   * Array of {
   *  - {x, y} 
   *  - element
   * }  
   */
  #positionedElements;

  constructor(positionedElements) {
    this.#positionedElements = positionedElements;
  }

  render() {
    for (let positionedElement of this.#positionedElements) {
      push();
      translate(positionedElement.position.x, positionedElement.position.y)
      positionedElement.element.render()
      pop()
    }
  }

  findElement(x, y) {
    for (let positionedElement of this.#positionedElements) {
      const lx = x - positionedElement.position.x
      const ly = y - positionedElement.position.y
      if (positionedElement.element.contains( lx, ly))
        return positionedElement.element
    }
    return null
  }
}
