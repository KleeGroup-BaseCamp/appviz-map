class Rectangle extends Element {
  #title;
  #height;
  #width;
  constructor({ title = "", style = {}, height, width }) {
    super(style);
    this.#title = title;
    this.#height = height;
    this.#width = width;
  }

  render() {
    this.applyStyle(this._style);
    rect(0, 0, this.#width, this.#height);
    if (this.#title) {
      rectMode(CENTER);
      textSize(16);
      noStroke();
      fill(255);
      textAlign(CENTER, CENTER);
      textFont("Helvetica");
      text(this.#title, this.#width / 2, 20); // Hardcode title position for now
      rectMode(CORNER);
    }
  }

  contains(x, y) {
    return x > 0 && x < this.#width && y > 0 && y < this.#height;
  }
}
