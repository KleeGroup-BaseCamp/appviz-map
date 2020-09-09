class Element {
  constructor(
    row,
    column,
    height,
    width,
    style = { fill: COLOR_1, stroke: 255, strokeWeight: 2 },
    level = 0
  ) {
    this.row = row;
    this.column = column;
    this.height = height;
    this.width = width;
    this.style = style; // To be infered later from its "type" or its layer
    this.level = level;
  }

  render(layer) {
    applyStyle(this.style);
    const { x, y } = upperLeftPixel(
      layer.rows,
      layer.columns,
      this.row,
      this.column
    );
    const { rowSize, columnSize } = tileSize(layer.rows, layer.columns);
    rect(
      x + this.level * 20,
      y + this.level * 20,
      columnSize * this.width - 2 * this.level * 20,
      rowSize * this.height - 2 * this.level * 20
    );
  }

  isHovered(mouseX, mouseY, layer) {
    const { x, y } = upperLeftPixel(
      layer.rows,
      layer.columns,
      this.row,
      this.column
    );
    const { rowSize, columnSize } = tileSize(layer.rows, layer.columns);
    return (
      mouseX > x + this.level * 20 &&
      mouseX < x + columnSize * this.width - this.level * 20 &&
      mouseY > y + this.level * 20 &&
      mouseY < y + rowSize * this.height - this.level * 20
    );
  }
}
