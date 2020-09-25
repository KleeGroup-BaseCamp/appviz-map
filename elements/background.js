class Background extends Element {
  #backgroundColor;
  constructor(backgroundColor) {
    super();
    this.#backgroundColor = backgroundColor;
  }

  render() {
    background(...this.#backgroundColor);
  }

  contains(x, y) {
    return false;
  }
}
