import Layer from "./layer";
import Map from "./map";
export default class MapBuilder {
  private layers: Layer[] = []

  /**
   * Adds a layer 
   * 
   * @param {Layer} layer 
   */
  public addLayer(layer: Layer): MapBuilder {
    this.layers.push(layer)
    return this
  }

  /**
   * Adds layers 
   * 
   * @param {Layer[]} layers 
   */
  public addLayers(layers: Layer[]): MapBuilder{
    layers.forEach(layer => this.addLayer(layer));
    return this;
  }

  /**
   * Builds an immutable Map
   * 
   * @returns {Map} map
   */
  public build(): Map {
    return new Map(this.layers)
  }
}
