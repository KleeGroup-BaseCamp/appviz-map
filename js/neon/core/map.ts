import { VElement, Layer, State } from "."

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
   * Finds the element positionned in (x, y)
   * 
   * @param {number} x 
   * @param {number} y 
   * @returns {?VElement} element 
   */
  public findElement(x: number, y: number): (VElement | null) {
    for (const layer of this.layers.slice().reverse()) {
      const element = layer.findElement(x, y)
      if (element) {
        return element
      }
    }
    return null
  }
}