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
    this.applyStyle(this.style);
    const { x, y, width, height } = this.getBoundingBox();
    rect(x, y, width, height);
  }

  contains(xx, yy) {
    const { x, y, width, height } = this.getBoundingBox();

    return xx > x && xx < x + width && yy > y && yy < y + height;
  }
}
