class Grid extends Element {
  #columns
  #rows
  constructor(columns, rows, style) {
    super();
    this.#columns = columns;
    this.#rows = rows;
    this._style = { ...this._style, ...style };
  }

  render() {
    this._applyStyle();
    for (let i = 0; i < this.#rows; i++) {
      line(0, (canvasSize / this.#rows) * i, canvasSize, (canvasSize / this.#rows) * i);
    }
    for (let j = 0; j < this.#columns; j++) {
      line((canvasSize / this.#columns) * j, 0, (canvasSize / this.#columns) * j, canvasSize);
    }
  }
}
