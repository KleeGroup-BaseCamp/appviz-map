class Element {
  constructor(row, column, height, width) {
    this.row = row;
    this.column = column;
    this.height = height;
    this.width = width;
  }

  render(layer) {
    fill(122, 203, 220);
    const { x, y } = upperLeftPixel(
      layer.rows,
      layer.columns,
      this.row,
      this.column
    );
    const { rowSize, columnSize } = tileSize(layer.rows, layer.columns);
    rect(x, y, columnSize * this.width, rowSize * this.height);
  }
}
