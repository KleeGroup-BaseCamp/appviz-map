class Background extends Element {
  #backgroundColor;
  constructor(backgroundColor) {
    super(0, 0);
    this.#backgroundColor = backgroundColor;
  }

  render() {
    background(...this.#backgroundColor);
  }

  contains(x, y) {
    return false;
  }
}
