class LayerBuilder {
  #elements = [];

  addElement(element, x = 0, y = 0) {
    this.#elements.push({ element, position: { x, y } });
    return this;
  }

  build() {
    return new Layer(this.#elements);
  }
}
