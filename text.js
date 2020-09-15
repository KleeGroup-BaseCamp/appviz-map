class Text extends Element {
  constructor({ column, row, numOfColumns, numOfRows, text }) {
    super({
      column,
      row,
      numOfColumns,
      numOfRows,
    });
    this.text = text;
  }

  render() {
    const { upperLeftX, upperLeftY, width, height } = this.getPixelProps();
    rectMode(CENTER);
    text(
      this.title,
      upperLeftX + width / 2,
      upperLeftY + height / (2 * this.numOfRows)
    );
    rectMode(CORNER);
  }
}
