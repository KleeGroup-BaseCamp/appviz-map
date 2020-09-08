class Layer {
  constructor(rows, columns, elements) {
    this.rows = rows;
    this.columns = columns;
    this.elements = elements;
  }

  render() {
    for (let element of this.elements) {
      element.render(layer);
    }
  }
  renderGrid() {
    const { rowSize, columnSize } = tileSize(this.rows, this.columns);
    stroke(255);
    for (let i = 0; i < this.rows; i++) {
      line(0, rowSize * (i + 1), windowWidth, rowSize * (i + 1));
    }
    for (let j = 0; j < this.columns; j++) {
      line(columnSize * (j + 1), 0, columnSize * (j + 1), windowHeight);
    }
  }
}
