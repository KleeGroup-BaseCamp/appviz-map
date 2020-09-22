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
    layer.addElement(
      new Rectangle({ height: 100, width: 300, title: "It works" })
    );
    return new Map([layer]);
  }
}
