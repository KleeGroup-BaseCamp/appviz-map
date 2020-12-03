import {PositionedElement, VElement, Layer} from "."
import {PxPosition} from "../layout"

type Gap = {
  column : number,
  row : number
}

export class GridLayerBuilder {
  private readonly positionedElements: PositionedElement[] = []
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
   * Adds an element 
   * 
   * @param {VElement} element 
   */
  public addElement(element: VElement): GridLayerBuilder  {
    const pxPosition: PxPosition = new PxPosition (this.x, this.y) 
    this.positionedElements.push({element, pxPosition})

    this.x =  this.x +  this.gap.column + element.getWidth()
    this.rowHeight = max(this.rowHeight, element.getHeight())
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
    return new Layer(this.positionedElements)
  }
}
