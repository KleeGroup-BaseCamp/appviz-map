class Rectangle extends Element {
  #title;
  #height;
  #width;
  constructor(x, y, width, height, title) {
    super(x, y);
    this.#height = height;
    this.#width = width;
    this.#title = title;
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
      rectMode(CENTER);
      textSize(16);
      noStroke();
      fill(255);
      textAlign(CENTER, CENTER);
      textFont("Helvetica");
      text(this.#title, this.#width / 2, 20); // Hardcode title position
      pop();
    }
  }

  contains(x, y) {
    x -= this._x;
    y -= this._y;
    return x > 0 && x < this.#width && y > 0 && y < this.#height;
  }
}
