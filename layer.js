class Layer {
  #elements;

  constructor(elements) {
    this.#elements = elements;
  }

  render() {
    this.#elements.forEach((element) => {
      element.render();
    });
  }

  findElement(x, y) {
    for (let element of this.#elements) {
      if (element.contains(x, y)) return element;
    }
    return null;
  }
}
