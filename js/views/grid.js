class Grid extends Element {
  #width
  #height
  #columns
  #rows

  constructor(width, height, columns, rows) {
    super()
    this.#width = width
    this.#height = height
    this.#columns = columns
    this.#rows = rows
  }

  /**
   * @override 
   */
  render() {
    stroke(125, 50)
    strokeWeight(1)

    const rowSize = this.#height / this.#rows
    for (let i = 0; i < this.#rows; i++) {
      line(0, rowSize * i, this.#width, rowSize * i)
    }

    const columnSize = this.#width / this.#columns
    for (let j = 0; j < this.#columns; j++) {
      line(columnSize * j, 0, columnSize * j, this.#height)
    }
  }
}
