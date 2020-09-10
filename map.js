class Map {
  constructor(state, config, notebook) {
    this.layers = initLayers();

    // Use (state, config, notebook) to get layers
  }

  render() {
    background(30, 61, 116);
    let level = 0;
    for (let layer of this.layers) {
      layer.renderGrid(); // Drawing grid for testing purposes only
    }
    for (let layer of this.layers) {
      level += 1;
      layer.render(level);
    }
  }
}
