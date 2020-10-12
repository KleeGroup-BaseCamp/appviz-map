class Grid extends Element {
  #width
  #height
  #columns
  #rows
  #alpha

  constructor(width, height, columns, rows) {
    super()
    this.#width = width
    this.#height = height
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
