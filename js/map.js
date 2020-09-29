class Map {
  #selected;
  #layers;

  constructor(layers) {
    this.#layers = layers;
  }

  /*
    Renders the layers from bottom to up
   */
  render() {
    this.#renderLayers();
  }

  #renderLayers() {
    this.#layers.forEach(layer => layer.render());
  }

  /*
   * Finds the element positionned in x, y
   */
  findElement(x, y) {
    let index = this.#layers.length
    for (const layer of this.#layers.slice().reverse()) {
      index--;
      let element = layer.findElement(x, y);
      if (element) {
        return { element, index };
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
      element.setStyle("hover");
    }
    this.#selected = element;
  }

  click(element, layerIndex) {
    if (!group && layerIndex == 2) {
      group = element.title
    } else {
      group = false
    }
  }
}
