import { Component, Layer, State } from "."

export class Map {
  private readonly layers: Layer[]

  /**
   * Constructor
   * @param {Layer[]} layers 
   */
  constructor(layers: Layer[]) {
    this.layers = layers
  }

  /**
   * Renders the layers from bottom to up 
   */
  public render(state : State): void {
    this.layers
      .forEach(layer => layer.render(state))
  }

  /**
   * Finds the component positionned in (x, y)
   * 
   * @param {number} x 
   * @param {number} y 
   * @returns {?Component} component 
   */
  public findComponent(x: number, y: number): (Component | null) {
    for (const layer of this.layers.slice().reverse()) {
      const component = layer.findComponent(x, y)
      if (component) {
        return component
      }
    }
    return null
  }
}