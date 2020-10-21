export default class MapBuilder {
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
   * Adds layers 
   * 
   * @param {Layer[]} layers 
   */
  addLayers(layers) {
    layers.forEach(layer => this.addLayer(layer));
    return this;
  }

  /**
   * Builds an immutable Map
   * 
   * @returns {Map} map
   */
  build() {
    return new Map(this.#layers)
  }
}
