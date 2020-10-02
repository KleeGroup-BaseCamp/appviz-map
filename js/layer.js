class Layer {
  #elementsDetail;

  constructor(elementsDetail) {
    this.#elementsDetail = elementsDetail;
  }

  render() {
    this.#elementsDetail.forEach((elementDetail) => {
      push();
      translate(elementDetail.position.x, elementDetail.position.y);
      elementDetail.element.render();
      pop();
    });
  }

  findElement(x, y) {
    for (let elementDetail of this.#elementsDetail) {
      // console.log(this.#elementsDetail)
      // console.log(elementDetail)
      if (
        elementDetail.element.contains(
          x - elementDetail.position.x,
          y - elementDetail.position.y
        )
      )
        return elementDetail.element;
    }
    return null;
  }
}
