class Map {
  constructor(state, config, notebook) {
    this.layers = initLayers();

    // Use (state, config, notebook) to get layers
  }

  render() {
    for (let layer of this.layers) {
      layer.renderGrid(); // Drawing grid for testing purposes only
    }
    for (let layer of this.layers) {
      layer.render();
    }
  }
}
