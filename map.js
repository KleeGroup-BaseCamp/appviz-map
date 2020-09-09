class Map {
  constructor(state, config, notebook, layers = []) {
    this.layers = layers; // Possibility to pass layers array directly (for testing purposes)
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
