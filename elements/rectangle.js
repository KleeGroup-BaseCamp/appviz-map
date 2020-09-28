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
    if (this.#title) {
      push();
      noStroke();
      fill(this._style.font.fill);
      textAlign(CENTER);
      // text(this.#title, 0, textAscent() + 20, this.#width);
      text(this.#title, this.#width / 2, textAscent() + 5);
      stroke(255);
      pop();
    }
  }

  contains(x, y) {
    return x > 0 && x < this.#width && y > 0 && y < this.#height;
  }
}
