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
