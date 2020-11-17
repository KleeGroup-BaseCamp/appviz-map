import {PositionedElement, VElement, Layer} from "../core"
import {PxPosition} from "../layout"

export class GridLayerBuilder {
  private readonly positionedElements: PositionedElement[] = []
  private margin: number = 50  
  private x : number = 0
  private y : number = 150
  private rowHeight: number = 0
  /**
   * Adds an element 
   * 
   * @param {VElement} element 
   */
  public addElement(element: VElement): GridLayerBuilder  {
    this.x =  this.x +  this.margin+ element.getWidth()
    this.rowHeight = max(this.rowHeight, element.getHeight())

    const pxPosition: PxPosition = new PxPosition (this.x, this.y) 
    this.positionedElements.push({element, pxPosition})
    return this
  }

  public beginRow(): GridLayerBuilder {
    this.x = 0
    this.y = this.y + this.margin + this.rowHeight 
    this.rowHeight=0
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
