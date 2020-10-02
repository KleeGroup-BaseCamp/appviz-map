class Layer {
  #positionedElements;

  constructor(positionedElements) {
    this.#positionedElements = positionedElements;
  }

  render() {
    this.#positionedElements.forEach((positionedElement) => {
      push();
      translate(positionedElement.position.x, positionedElement.position.y);
      positionedElement.element.render();
      pop();
    });
  }

  findElement(x, y) {
    for (let positionedElement of this.#positionedElements) {
      // console.log(this.#elementsDetail)
      // console.log(elementDetail)
      if (
        positionedElement.element.contains(
          x - positionedElement.position.x,
          y - positionedElement.position.y
        )
      )
        return positionedElement.element;
    }
    return null;
  }
}
