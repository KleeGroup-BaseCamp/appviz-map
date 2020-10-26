import Layer from "./layer";
import Map from "./map";
export default class MapBuilder {
  private layers: Layer[] = []

  /**
   * Adds a layer 
   * 
   * @param {Layer} layer 
   */
  addLayer(layer: Layer) {
    this.layers.push(layer)
    return this
  }

  /**
   * Adds layers 
   * 
   * @param {Layer[]} layers 
   */
  addLayers(layers: Layer[]) {
    layers.forEach(layer => this.addLayer(layer));
    return this;
  }

  /**
   * Builds an immutable Map
   * 
   * @returns {Map} map
   */
  build(): Map {
    return new Map(this.layers)
  }
}
