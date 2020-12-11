import * as p5 from "p5"
import {PositionedComponent, Component, Layer} from "."

export class LayerBuilder {
  private readonly positionedComponents: PositionedComponent[] = []

  /**
   * Adds a component 
   * 
   * @param {Component} component 
   * @param {PxPosition} pxPosition
   */
  public addComponent(component: Component, pxPosition: p5.Vector = createVector(0, 0)): LayerBuilder  {
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
