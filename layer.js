class Layer {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.elements = [];
  }

  addElement(element) {
    this.elements.push(element);
  }

  render() {
    for (let element of this.elements) {
      element.render();
    }
  }
  renderGrid(style = { stroke: 100, strokeWeight: 1 }) {
    applyStyle(style);
    const { rowSize, columnSize } = tileSize(this.rows, this.columns);
    for (let i = 0; i < this.rows; i++) {
      line(0, rowSize * (i + 1), windowWidth, rowSize * (i + 1));
    }
    for (let j = 0; j < this.columns; j++) {
      line(columnSize * (j + 1), 0, columnSize * (j + 1), windowHeight);
    }
  }
}
