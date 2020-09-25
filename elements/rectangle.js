class Rectangle extends Element {
  #title;
  #height;
  #width;
  constructor(x, y, width, height, title, style) {
    super(x, y);
    this.#height = height;
    this.#width = width;
    this.#title = title;
    this._style = { ...this._style, ...style };
  }

  render() {
    push();
    this._applyStyle();
    translate(this._x, this._y);
    rect(0, 0, this.#width, this.#height);
    this.#renderTitle();
    pop();
  }

  #renderTitle() {
    if (this.#title) {
      push();
      noStroke();
      fill(this._style.font.fill);
      textAlign(CENTER);
      text(this.#title, 0, 5, this.#width);
      pop();
    }
  }

  contains(x, y) {
    const lx = x - this._x;
    const ly = y - this._y;

    return lx > 0 && lx < this.#width && ly > 0 && ly < this.#height;
  }
}
