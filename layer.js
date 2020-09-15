class Layer {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.elements = [];
  }

  withElement(element) {
    this.elements.push(element);
    element.layer = this;
    return this;
  }

  render() {
    this.elements.forEach((element) => element.render());
  }

  findElement(x, y) {
    for (let element of this.elements) {
      if (element.contains(x, y)) return element;
    }
    return null;
  }

  renderGrid() {
    strokeWeight(1);
    stroke(100);
    const rowSize = windowHeight / this.rows;
    const columnSize = windowWidth / this.columns;
    for (let i = 0; i < this.rows; i++) {
      line(0, rowSize*i, windowWidth, rowSize*i);
    }
    for (let j = 0; j < this.columns; j++) {
      line(columnSize*j, 0, columnSize*j, windowHeight);
    }
  }

  initStyle() {
    this.elements.forEach((element) => element.initStyle());
  }
}
