class Rectangle extends Element {
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
    this.applyStyle(this.style);
    const { upperLeftX, upperLeftY, width, height } = this.getBoundingBox();
    rect(upperLeftX, upperLeftY, width, height);
    rectMode(CENTER);
    textSize(32);
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textFont("Helvetica");
    text(
      this.title,
      upperLeftX + width / 2,
      upperLeftY + height / (2 * this.numOfRows) // Position on the first column
    );
    rectMode(CORNER);
  }

  contains(x, y) {
    const { upperLeftX, upperLeftY, width, height } = this.getBoundingBox();

    return (
      x > upperLeftX &&
      x < upperLeftX + width &&
      y > upperLeftY &&
      y < upperLeftY + height
    );
  }
}
