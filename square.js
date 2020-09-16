class Square extends Element {
  constructor({ column, row, numOfColumns, numOfRows, title }) {
    super({
      column,
      row,
      numOfColumns,
      numOfRows,
      title,
    });
  }

  getSquareProps() {
    let sideLength, squareUpperLeftX, squareUpperLeftY;
    const {
      upperLeftX: boundingBoxUpperLeftX,
      upperLeftY: boundingBoxUpperLeftY,
      width: boundingBoxWidth,
      height: boundingBoxHeight,
    } = this.getBoundingBox();

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
    return { squareUpperLeftX, squareUpperLeftY, sideLength };
  }

  render() {
    this.applyStyle(this.style);
    const {
      squareUpperLeftX,
      squareUpperLeftY,
      sideLength,
    } = this.getSquareProps();
    square(squareUpperLeftX, squareUpperLeftY, sideLength);

    // Add title
    rectMode(CENTER);
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textFont("Helvetica");
    textSize(this.getMaxTextSize(sideLength));
    text(
      this.title,
      squareUpperLeftX + sideLength / 2,
      squareUpperLeftY + sideLength / 2,
      sideLength,
      sideLength
    );
    rectMode(CORNER);
  }

  getMaxTextSize(sideLength) {
    if (!this.title) return 0;
    let size = 1;
    textSize(size);
    while (textWidth(this.title) < sideLength) {
      size++;
      textSize(size);
    }
    return size - 1;
  }

  contains(x, y) {
    const {
      squareUpperLeftX,
      squareUpperLeftY,
      sideLength,
    } = this.getSquareProps();
    return (
      x > squareUpperLeftX &&
      x < squareUpperLeftX + sideLength &&
      y > squareUpperLeftY &&
      y < squareUpperLeftY + sideLength
    );
  }
}
