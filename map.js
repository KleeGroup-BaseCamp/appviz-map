class Map {
  #selected;
  #layers;

  constructor(layers) {
    this.#layers = layers;
    this.#initStyle();
  }

  #initStyle() {
    this.#layers.forEach((layer) => layer.initStyle());
  }

  getlayers() {
    return this.#layers;
  }

  /*
    Renders the map
    - the background
    - the layers from bottom to up
   */
  render() {
    this.#renderBackground();
    // this.#renderGrid();
    this.#renderLayers();
  }

  #renderBackground() {
    background(3, 4, 94);
  }

  #renderLayers() {
    this.#layers.forEach((layer) => layer.render());
  }

  #renderGrid() {
    for (let layer of this.#layers) {
      layer.renderGrid(); // Drawing grid for testing purposes only
    }
  }

  /*
   * Finds the element positionned in x, y
   */
  findElement(x, y) {
    for (let layer of this.#layers.slice().reverse()) {
      let element = layer.findElement(x, y);
      if (element) {
        return element;
      }
    }
    return null;
  }

  /*
    Selects an element on the map
    The previous selected element is unselected.
    Each element is responsible for its style
  */
  select(element) {
    if (this.#selected) {
      this.#selected.initStyle();
    }
    if (element) {
      element.hover();
    }
    this.#selected = element;
  }
}
