class Element {
  constructor({ column, row, numOfColumns, numOfRows }) {
    this.column = column;
    this.row = row;
    this.numOfColumns = numOfColumns;
    this.numOfRows = numOfRows;
  }

  getPixelProps() {
    const padding = this.layer.level * 30;
    const rowSize = windowHeight / this.layer.rows;
    const columnSize = windowWidth / this.layer.columns;
    const upperLeftX = this.column * columnSize + padding;
    const upperLeftY = this.row * rowSize + padding;
    const height = rowSize * this.numOfRows - 2 * padding;
    const width = columnSize * this.numOfColumns - 2 * padding;
    return { upperLeftX, upperLeftY, width, height };
  }

  initStyle() {
    this.style = {
      fill: COLORS[this.layer.level],
      stroke: 255,
      strokeWeight: 2,
    };
  }

  hover() {
    this.style.fill = HOVER_COLOR;
  }

  applyStyle(style) {
    if (style.stroke) stroke(style.stroke);
    if (style.strokeWeight) strokeWeight(style.strokeWeight);
    if (style.fill) fill(...style.fill);
  }

  render() {
    //This method must ne overridden
  }

  contains(x, y) {
    //This method must ne overridden
  }
}
