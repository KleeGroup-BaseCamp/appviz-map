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
    // console.log(this.title, this.getMaxTextSize(sideLength));
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
    if (this.title === "DtGroups") {
      //   console.log(textWidth(this.title));
    }
    return size - 1;
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
