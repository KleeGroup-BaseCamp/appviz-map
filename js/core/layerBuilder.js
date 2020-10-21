import PxPosition from "../layout/pxPosition";
import Layer from "./layer"
export default class LayerBuilder {
  #positionedElements = []

  /**
   * Adds an element 
   * 
   * @param {VElement} element 
   * @param {PxPosition} pxPosition
   */
  addElement(element, pxPosition = new PxPosition(0, 0)) {
    this.#positionedElements.push({ element, pxPosition})
    return this
  }

  /**
   * Builds an immutable Layer
   * 
   * @returns {Layer} layer
   */
  build() {
    return new Layer(this.#positionedElements)
  }
}
