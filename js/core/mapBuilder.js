class MapBuilder {
  #layers = [];

  addLayer(layer) {
    this.#layers.push(layer);
    return this;
  }

  build() {
    return new Map(this.#layers);
  }
}
