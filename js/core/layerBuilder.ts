import {PositionedElement, VElement, Layer} from "../core"
import {PxPosition} from "../layout"

export class LayerBuilder {
  private readonly positionedElements: PositionedElement[] = []

  /**
   * Adds an element 
   * 
   * @param {VElement} element 
   * @param {PxPosition} pxPosition
   */
  public addElement(element: VElement, pxPosition: PxPosition = new PxPosition(0, 0)): LayerBuilder  {
    this.positionedElements.push({ element, pxPosition})
    return this
  }

  /**
   * Builds an immutable Layer
   * 
   * @returns {Layer} layer
   */
  public build(): Layer {
    return new Layer(this.positionedElements)
  }
}
