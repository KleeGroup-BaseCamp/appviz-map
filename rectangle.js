class Rectangle extends Element {
  constructor({ column, row, numOfColumns, numOfRows }) {
    super({
      column,
      row,
      numOfColumns,
      numOfRows,
    });
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
