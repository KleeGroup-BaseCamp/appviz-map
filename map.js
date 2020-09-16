class Map {
  #selected = null;
  #layers = [];
  #notebookHandler;

  constructor(state, config, notebookHandler) {
    let level = 0;
    this.#notebookHandler = notebookHandler;
    this.#layers = this.#notebookHandler
      ? this.#notebookHandler.generateLayersFromDomains(
          this.#notebookHandler.extractDomains()
        )
      : [];
    for (let layer of this.#layers) {
      layer.level = level;
      layer.initStyle();
      level++;
    }
  }

  render() {
    this.#renderBackground();
    this.#renderGrid();
    this.#renderLayers();
  }

  #renderBackground() {
    background(3, 4, 94);
  }

  #renderLayers() {
    let level = 0;
    this.#layers.forEach((layer) => {
      layer.level = level;
      layer.render();
      level += 1;
    });
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
