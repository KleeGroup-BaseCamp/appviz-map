class Grid extends Element {
  #columns
  #rows
  #alpha

  /**
   * Constructor
   * @param {*} id 
   * @param {number} width 
   * @param {number} height 
   * @param {number} columns 
   * @param {number} rows 
   */
  constructor(id, width, height, columns, rows) {
    super(id, width, height, false)
    this.#columns = columns
    this.#rows = rows
    AnimationUtils.animate(255, 0, 1000, a => this.#alpha = a)
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
