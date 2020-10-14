class MapBuilder {
  #layers = []

  /**
   * Adds a layer 
   * 
   * @param {Layer} layer 
   */
  addLayer(layer) {
    this.#layers.push(layer)
    return this
  }

  /**
   * Builds an immutable Map
   * 
   * @return {Map} map
   */
  build() {
    return new Map(this.#layers)
  }
}
