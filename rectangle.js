class Rectangle extends Element {
  constructor({
    column,
    row,
    numOfColumns,
    numOfRows,
    style = { fill: COLOR_1, stroke: 255, strokeWeight: 2 },
  }) {
    super({
      column,
      row,
      numOfColumns,
      numOfRows,
      style,
    });
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

  render() {
    applyStyle(this.style);
    const { x, y, width, height } = this.getBoundingBox();
    rect(x, y, width, height);
  }

  isHovered(mouseX, mouseY) {
    const { x, y, width, height } = this.getBoundingBox();

    return (
      mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height
    );
  }
}
