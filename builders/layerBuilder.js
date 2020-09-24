class LayerBuilder {
  #elements = [];

  addElement(element) {
    this.#elements.push(element);
    return this;
  }

  build() {
    return new Layer(this.#elements);
  }
}
