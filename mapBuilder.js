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

  buildTestMap() {
    let layer = new Layer();
    layer
      .addElement(new Rectangle(0, 0, 200, 100, "It works"))
      .addElement(new Rectangle(200, 200, 200, 100));
    return new Map([layer]);
  }
}
