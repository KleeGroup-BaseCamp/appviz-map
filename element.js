class Element {
  constructor({ column, row, numOfColumns, numOfRows, style }) {
    this.column = column;
    this.row = row;
    this.numOfColumns = numOfColumns;
    this.numOfRows = numOfRows;
    this.style = style; // To be infered later from its "type" or its layer
  }

  // render() {
  //   applyStyle(this.style);
  //   const { x, y } = upperLeftPixel(
  //     this.layer.rows,
  //     this.layer.columns,
  //     this.row,
  //     this.column
  //   );
  //   const { rowSize, columnSize } = tileSize(
  //     this.layer.rows,
  //     this.layer.columns
  //   );
  //   if (this.shape === RECTANGLE) {
  //     rect(
  //       x + this.level * 20,
  //       y + this.level * 20,
  //       columnSize * this.width - 2 * this.level * 20,
  //       rowSize * this.height - 2 * this.level * 20
  //     );
  //   } else if (this.shape === HEXAGONE) {
  //     // console.log("got here");
  //     const param = (rowSize * this.height) / (2 * sqrt(3));
  //     beginShape();
  //     vertex(x + param, y);
  //     vertex(x + columnSize * this.width - param, y);
  //     vertex(x + columnSize * this.width, y + (rowSize * this.height) / 2);
  //     vertex(x + columnSize * this.width - param, y + rowSize * this.height);
  //     vertex(x + param, y + rowSize * this.height);
  //     vertex(x, y + (rowSize * this.height) / 2);
  //     endShape(CLOSE);
  //   }
  // }

  isHovered(mouseX, mouseY) {
    const { x, y } = upperLeftPixel(
      this.layer.rows,
      this.layer.columns,
      this.row,
      this.column
    );
    const { rowSize, columnSize } = tileSize(
      this.layer.rows,
      this.layer.columns
    );
    if (this.shape === RECTANGLE) {
      return (
        mouseX > x + this.level * 20 &&
        mouseX < x + columnSize * this.width - this.level * 20 &&
        mouseY > y + this.level * 20 &&
        mouseY < y + rowSize * this.height - this.level * 20
      );
    } else if (this.shape === HEXAGONE) {
      const param = (rowSize * this.height) / (2 * sqrt(3));
      const coefs = {
        upperLeft: {
          a: -(rowSize * this.height) / (param * 2),
        },
        bottomLeft: {},
        upperRight: {},
        bottomRight: {},
      };
      coefs.upperLeft.b = y - coefs.upperLeft.a * (x + param);
      coefs.bottomLeft.a = -coefs.upperLeft.a;
      coefs.bottomLeft.b =
        y + rowSize * this.height - coefs.bottomLeft.a * (x + param);
      coefs.upperRight.a = coefs.bottomLeft.a;
      coefs.upperRight.b =
        y - coefs.upperRight.a * (x + columnSize * this.width - param);
      coefs.bottomRight.a = coefs.upperLeft.a;
      coefs.bottomRight.b =
        y +
        rowSize * this.height -
        coefs.bottomRight.a * (x + columnSize * this.width - param);

      return (
        mouseX * coefs.upperLeft.a + coefs.upperLeft.b < mouseY &&
        mouseX * coefs.bottomLeft.a + coefs.bottomLeft.b > mouseY &&
        mouseX * coefs.upperRight.a + coefs.upperRight.b < mouseY &&
        mouseX * coefs.bottomRight.a + coefs.bottomRight.b > mouseY &&
        mouseY > y &&
        mouseY < y + rowSize * this.height
      );
    }
    return false;
  }
}
