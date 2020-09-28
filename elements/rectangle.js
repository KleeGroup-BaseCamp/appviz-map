class Rectangle extends Element {
  #title;
  #height;
  #width;
  constructor(width, height, title, style) {
    super();
    this.#height = height;
    this.#width = width;
    this.#title = title;
    this._style = { ...this._style, ...style };
  }

  render() {
    this._applyStyle();
    rect(0, 0, this.#width, this.#height);
    this.#renderTitle();
  }

  #renderTitle() {
    noStroke();
    fill(this._style.font.fill);
    textAlign(CENTER);
    text(
      this.#title ? this.#title : "No title",
      0,
      textAscent() + 5,
      this.#width
    );
  }

  contains(x, y) {
    return x > 0
      && x < this.#width
      && y > 0
      && y < this.#height;
  }
}
