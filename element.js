class Element {
  constructor({ column, row, numOfColumns, numOfRows, style }) {
    this.column = column;
    this.row = row;
    this.numOfColumns = numOfColumns;
    this.numOfRows = numOfRows;
    this.style = style; // To be infered later from its "type" or its layer
  }

  getBoundingBox() {
    const rowSize = windowHeight / this.layer.rows;
    const columnSize = windowWidth / this.layer.columns;
    const x = this.column * columnSize;
    const y = this.row * rowSize;
    const height = rowSize * this.numOfRows;
    const width = columnSize * this.numOfColumns;
    return { x, y, width, height };
  }
}
