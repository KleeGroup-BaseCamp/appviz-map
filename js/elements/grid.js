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

    const rowSize = canvasSize / this.#rows; 
    for (let i = 0; i < this.#rows; i++) {
      line(0, rowSize * i, canvasSize, rowSize * i);
    }

    const columnSize = canvasSize / this.#columns;
    for (let j = 0; j < this.#columns; j++) {
      line(columnSize * j, 0, columnSize  * j, canvasSize);
    }
  }
}
