class Map {
  constructor(state, config, notebook) {
    this.layers = initLayers(); // For testing purposes only
    // Use (state, config, notebook) to get layers
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

  selectElement(x, y) {
    for (let layer of this.layers.slice().reverse()) {
      let element = layer.selectElement(x, y);
      if (element) return element;
    }
    return null;
  }

  handleSelection(element) {
    if (element) {
      this.layers.forEach((layer) => layer.initStyle());
      element.style.fill = HOVER_COLOR;
      document.querySelector("main").style.cursor = "pointer";
    } else {
      this.layers.forEach((layer) => layer.initStyle());
      document.querySelector("main").style.cursor = "default";
    }
  }
}
