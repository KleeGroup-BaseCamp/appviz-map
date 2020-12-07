import {PositionedComponent, Component, Layer} from "."
import {PxPosition} from "../layout"

type Gap = {
  column : number,
  row : number
}

export class GridLayerBuilder {
  private readonly positionedComponents: PositionedComponent[] = []
  private readonly gap: Gap
  private x : number = 150
  private y : number = 150
  private rowHeight: number = 0

  constructor(gap? : Gap){
      this.gap = gap??  {
        column : 50,
        row : 50
      }
  }


  /**
   * Adds a component 
   * 
   * @param {Component} component 
   */
  public addComponent(component: Component): GridLayerBuilder  {
    const pxPosition: PxPosition = new PxPosition (this.x, this.y) 
    this.positionedComponents.push({component, pxPosition})

    this.x =  this.x +  this.gap.column + component.getWidth()
    this.rowHeight = max(this.rowHeight, component.getHeight())
    return this
  }

  /**
   * @param rowGap the row gap can be overridden by a specific value  
   */  
  public beginRow(rowGap? : number): GridLayerBuilder {
    this.x = 150
    this.y = this.y + this.rowHeight
    this.y += rowGap?? this.gap.row
    this.rowHeight=0
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
