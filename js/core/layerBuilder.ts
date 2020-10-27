import {VElement} from "./element";
import {Layer} from "./layer"

import {PxPosition} from "../layout/index";
import {PositionedElement} from "../types/index";

export class LayerBuilder {
  private positionedElements: PositionedElement[] = []

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
