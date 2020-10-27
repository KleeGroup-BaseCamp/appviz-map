import {Map} from "./map";
import {Layer} from "./layer"

export class MapBuilder {
  private readonly layers: Layer[] = []

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
    layers.forEach(layer => this.addLayer(layer))
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
