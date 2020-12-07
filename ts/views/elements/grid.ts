import {style} from "../../app"
import {VElement, State}  from "../../neon"
import {AnimationUtils}  from "../../neon"
import {PxSize} from "../../neon"

export class Grid extends VElement {
  private readonly columns: number
  private readonly rows: number
  private  alpha? : number

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
    AnimationUtils.animate(150, 0, 1000, (a:number) => this.alpha = a)
  }

  /**
   * @override 
   */
  public render(state : State) : void{
    let color = style.text.color.secondary
    if (this.alpha) {
//      color.setAlpha(this.alpha)  //TODO
    }
    this.alpha ===0 ? noStroke() :stroke(color)
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