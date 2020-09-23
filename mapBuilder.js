class MapBuilder {
  #layers = [];

  addLayer() {
    let layer = new Layer();
    this.#layers.push(layer);
    return layer;
  }

  build() {
    return new Map(this.#layers);
  }

  buildTestMap() {
    let layer = new Layer();
    layer
      .addElement(new Rectangle(400, 400, 200, 100, "Title goes here"))
      .addElement(new Rectangle(200, 200, 200, 100))
      .addElement(new ItemType(0, 0, "test", 15));
    return new Map([layer]);
  }
}
