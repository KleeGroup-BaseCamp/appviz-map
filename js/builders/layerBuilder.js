class LayerBuilder {
  #positionedElements = [];

  addElement(element, x = 0, y = 0) {
    this.#positionedElements.push({ element, position: { x, y } });
    return this;
  }

  build() {
    return new Layer(this.#positionedElements);
  }
}
