class Map {
  constructor(state, config, notebook) {
    this.layers = initLayers(); // For testing purposes only
    let level = 0;
    for (let layer of this.layers) {
      layer.level = level;
      layer.initStyle();
      level += 1;
    }
  }

  render() {
    background(3, 4, 94);
    for (let layer of this.layers) {
      layer.renderGrid(); // Drawing grid for testing purposes only
    }
    let level = 0;
    for (let layer of this.layers) {
      layer.level = level;
      layer.render();
      level += 1;
    }
  }

  findElement(x, y) {
    let elementFound = false;
    for (let layer of this.layers.slice().reverse()) {
      let element = layer.findElement(x, y);
      if (!elementFound && element) {
        this.hoveredElement = element;
        elementFound = true;
      }
    }
    if (!elementFound) this.hoveredElement = null;
  }

  handleHover() {
    if (this.hoveredElement) {
      this.layers.forEach((layer) => layer.initStyle());
      this.hoveredElement.style.fill = HOVER_COLOR;
      document.querySelector("main").style.cursor = "pointer";
    } else {
      this.layers.forEach((layer) => layer.initStyle());
      document.querySelector("main").style.cursor = "default";
    }
  }
}
