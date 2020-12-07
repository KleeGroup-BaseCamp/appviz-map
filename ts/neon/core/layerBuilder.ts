import {PositionedComponent, Component, Layer} from "."
import {PxPosition} from "../layout"

export class LayerBuilder {
  private readonly positionedComponents: PositionedComponent[] = []

  /**
   * Adds a component 
   * 
   * @param {Component} component 
   * @param {PxPosition} pxPosition
   */
  public addComponent(component: Component, pxPosition: PxPosition = new PxPosition(0, 0)): LayerBuilder  {
    this.positionedComponents.push({ component, pxPosition})
    return this
  }

  /**
   * Builds an immutable Layer
   * 
   * @returns {Layer} layer
   */
  public build(): Layer {
    return new Layer(this.positionedComponents)
  }
}
