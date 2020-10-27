import {VElement}  from "../../core/index"
import {AnimationUtils}  from "../../utils/index"
import {PxSize} from "../../layout/index"
import {style} from "../../sketch"

export class Grid extends VElement {
  private readonly columns: number
  private readonly rows: number
  private  alpha: (number | undefined)

  /**
   * Constructor
   * @param {*} id 
   * @param {PxSize} pxSize 
   * @param {number} columns 
   * @param {number} rows 
   */
  constructor(id: any, pxSize: PxSize, columns: number, rows: number) {
    super(id, pxSize, false)
    this.columns = columns
    this.rows = rows
    AnimationUtils.animate(150, 0, 300, a => this.alpha = a)
  }

  /**
   * @override 
   */
  public render() : void{
    let color = style.text.color.secondary
    if (this.alpha) {
      color.setAlpha(this.alpha) 
    }
    stroke(color)
    strokeWeight(1)

    const rowSize = this.getHeight() / this.rows
    for (let i = 0; i < this.rows; i++) {
      line(0, rowSize * i, this.getWidth(), rowSize * i)
    }

    const columnSize = this.getWidth() / this.columns
    for (let j = 0; j < this.columns; j++) {
      line(columnSize * j, 0, columnSize * j, this.getHeight())
    }
  }
}
