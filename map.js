class Map {
  constructor(state, config, notebook, layers = []) {
    this.layers = layers;
    // Logic goes here
  }

  render() {
    for (let layer of this.layers) {
      strokeWeight(2);
      layer.renderGrid(layer.rows, layer.columns);
      layer.render();
    }
  }
}
