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
    const { upperLeftX, upperLeftY, width, height } = this.getPixelProps();
    rect(upperLeftX, upperLeftY, width, height);
  }

  contains(x, y) {
    const { upperLeftX, upperLeftY, width, height } = this.getPixelProps();

    return (
      x > upperLeftX &&
      x < upperLeftX + width &&
      y > upperLeftY &&
      y < upperLeftY + height
    );
  }
}
