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
    textSize(16);
    text(
      this.getMaxCharacters(sideLength) + 3 != this.title.length
        ? this.title.slice(0, this.getMaxCharacters(sideLength)) + "..."
        : this.title,
      squareUpperLeftX + sideLength / 2,
      squareUpperLeftY + sideLength / 2
    );
    rectMode(CORNER);
  }

  getMaxCharacters(sideLength) {
    if (!this.title) return 0;
    let numOfCharacters = 1;
    while (
      numOfCharacters <= this.title.length &&
      textWidth(this.title.slice(0, numOfCharacters)) < sideLength
    ) {
      numOfCharacters++;
    }
    return numOfCharacters - 4;
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
