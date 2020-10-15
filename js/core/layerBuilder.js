class LayerBuilder {
  #positionedElements = []

  /**
   * Adds an element 
   * 
   * @param {Element} element 
   * @param {?number} [x=0]
   * @param {?number} [y=0] 
   */
  addElement(element, x = 0, y = 0) {
    this.#positionedElements.push({ element, position: { x, y } })
    return this
  }

  /**
   * Builds an immutable Layer
   * 
   * @returns {Layer} layer
   */
  build() {
    return new Layer(this.#positionedElements)
  }
}
