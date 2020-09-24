class Layer {
  #elements = [];

  constructor(elements) {
    this.#elements = elements;
  }

  render() {
    this.#elements.forEach(element => element.render());
  }

  findElement(x, y) {
    for (let element of this.#elements) {
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
      line(0, rowSize * i, windowWidth, rowSize * i);
    }
    for (let j = 0; j < this.columns; j++) {
      line(columnSize * j, 0, columnSize * j, windowHeight);
    }
  }
}
