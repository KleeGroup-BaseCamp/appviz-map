class MapBuilder {
  #level = 0;
  #layers = [];

  addLayer(columns, rows) {
    let layer = new Layer(columns, rows, this.#level);
    this.#layers.push(layer);
    this.#level++;
    return layer;
  }

  build() {
    return new Map(this.#layers);
  }
}
