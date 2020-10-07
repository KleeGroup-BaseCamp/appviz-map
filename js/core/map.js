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
    for (const layer of this.#layers.slice().reverse()) {
      const element = layer.findElement(x, y);
      if (element) {
        return element
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

  click(element) {
    if (!group && element instanceof Group) {
      group = element.title.toLowerCase();
    } else {
      group = false;
    }
  }
}