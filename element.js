class Element {
  constructor(
    row,
    column,
    height,
    width,
    style = { fill: [100, 203, 220], stroke: 255, strokeWeight: 2 }
  ) {
    this.row = row;
    this.column = column;
    this.height = height;
    this.width = width;
    this.style = style; // To be infered later from its "type" or its layer
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
    rect(x, y, columnSize * this.width, rowSize * this.height);
  }

  isHovered(mouseX, mouseY) {
    const { x, y } = upperLeftPixel(
      layer.rows,
      layer.columns,
      this.row,
      this.column
    );
    const { rowSize, columnSize } = tileSize(layer.rows, layer.columns);
    return (
      mouseX > x &&
      mouseX < x + columnSize * this.width &&
      mouseY > y &&
      mouseY < y + rowSize * this.height
    );
  }
}
