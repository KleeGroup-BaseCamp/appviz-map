class Element {
  constructor(row, column, height, width, color = [100, 203, 220]) {
    this.row = row;
    this.column = column;
    this.height = height;
    this.width = width;
    this.color = color; // To be infered later, along with other style propreties, from its "type" or its layer
  }

  render(layer) {
    // Color should be dependent on context
    fill(...this.color);
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
