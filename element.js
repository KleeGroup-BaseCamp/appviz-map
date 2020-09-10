class Element {
  constructor({ column, row, numOfColumns, numOfRows }) {
    this.column = column;
    this.row = row;
    this.numOfColumns = numOfColumns;
    this.numOfRows = numOfRows;
  }

  getBoundingBox() {
    const padding = this.layer.level * 30;
    const rowSize = windowHeight / this.layer.rows;
    const columnSize = windowWidth / this.layer.columns;
    const x = this.column * columnSize + padding;
    const y = this.row * rowSize + padding;
    const height = rowSize * this.numOfRows - 2 * padding;
    const width = columnSize * this.numOfColumns - 2 * padding;
    return { x, y, width, height };
  }

  initStyle() {
    console.log(COLORS[this.layer.level]);
    this.style = {
      fill: COLORS[this.layer.level],
      stroke: 255,
      strokeWeight: 2,
    };
  }
}
