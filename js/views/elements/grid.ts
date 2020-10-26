import VElement  from "../../core/element"
import AnimationUtils  from "../../utils/animationUtils"
import PxSize from "../../layout/pxSize"
import {style} from "../../sketch"
export default class Grid extends VElement {
  #columns: number
  #rows: number
  #alpha: number = 0

  /**
   * Constructor
   * @param {*} id 
   * @param {PxSize} pxSize 
   * @param {number} columns 
   * @param {number} rows 
   */
  constructor(id: any, pxSize: PxSize, columns: number, rows: number) {
    super(id, pxSize, false)
    this.#columns = columns
    this.#rows = rows
    AnimationUtils.animate(150, 0, 300, a => this.#alpha = a)
  }

  /**
   * @override 
   */
  render() {
    let color = style.text.color.secondary
    color.setAlpha(this.#alpha)
    stroke(color)
    strokeWeight(1)

    const rowSize = this.getHeight() / this.#rows
    for (let i = 0; i < this.#rows; i++) {
      line(0, rowSize * i, this.getWidth(), rowSize * i)
    }

    const columnSize = this.getWidth() / this.#columns
    for (let j = 0; j < this.#columns; j++) {
      line(columnSize * j, 0, columnSize * j, this.getHeight())
    }
  }
}
