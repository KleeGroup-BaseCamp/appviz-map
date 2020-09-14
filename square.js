class Square extends Element {
  constructor({ column, row, numOfColumns, numOfRows }) {
    super({
      column,
      row,
      numOfColumns,
      numOfRows,
    });
  }

  render() {
    let sideLength, squareUpperLeftX, squareUpperLeftY;
    this.applyStyle(this.style);
    const {
      upperLeftX: boundingBoxUpperLeftX,
      upperLeftY: boundingBoxUpperLeftY,
      width: boundingBoxWidth,
      height: boundingBoxHeight,
    } = this.getPixelProps();

    if (boundingBoxWidth > boundingBoxHeight) {
      sideLength = boundingBoxHeight;
      squareUpperLeftX =
        boundingBoxUpperLeftX + (boundingBoxWidth - boundingBoxHeight) / 2;
      squareUpperLeftY = boundingBoxUpperLeftY;
    } else {
      sideLength = boundingBoxWidth;
      squareUpperLeftX = boundingBoxUpperLeftX;
      squareUpperLeftY =
        boundingBoxUpperLeftY + (boundingBoxHeight - boundingBoxWidth) / 2;
    }
    square(squareUpperLeftX, squareUpperLeftY, sideLength);
  }

  contains(x, y) {
    let sideLength, squareUpperLeftX, squareUpperLeftY;
    const {
      upperLeftX: boundingBoxUpperLeftX,
      upperLeftY: boundingBoxUpperLeftY,
      width: boundingBoxWidth,
      height: boundingBoxHeight,
    } = this.getPixelProps();
    if (boundingBoxWidth > boundingBoxHeight) {
      sideLength = boundingBoxHeight;
      squareUpperLeftX =
        boundingBoxUpperLeftX + (boundingBoxWidth - boundingBoxHeight) / 2;
      squareUpperLeftY = boundingBoxUpperLeftY;
    } else {
      sideLength = boundingBoxWidth;
      squareUpperLeftX = boundingBoxUpperLeftX;
      squareUpperLeftY =
        boundingBoxUpperLeftY + (boundingBoxHeight - boundingBoxWidth) / 2;
    }
    return (
      x > squareUpperLeftX &&
      x < squareUpperLeftX + sideLength &&
      y > squareUpperLeftY &&
      y < squareUpperLeftY + sideLength
    );
  }
}
