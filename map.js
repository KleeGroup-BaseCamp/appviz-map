class Map {
  #selected;
  #layers;

  constructor(layers) {
    this.#layers = layers;
  }

  getlayers() {
    return this.#layers;
  }

  /*
    Renders the map
    - The background
    - The layers from bottom to up
   */
  render() {
    this.#renderBackground();
    this.#renderLayers();
    this.#renderGrid();
  }

  #renderBackground() {
    background(3, 4, 94);
  }

  #renderLayers() {
    this.#layers.forEach((layer) => layer.render());
  }

  #renderGrid() {
    strokeWeight(1);
    stroke(150);
    for (let i = 0; i < 12; i++) {
      line(0, (canvaSize / 12) * i, canvaSize, (canvaSize / 12) * i);
    }
    for (let j = 0; j < 12; j++) {
      line((canvaSize / 12) * j, 0, (canvaSize / 12) * j, canvaSize);
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
      this.#selected.setDefaultStyle();
    }
    if (element) {
      element.hover();
    }
    this.#selected = element;
  }
}
