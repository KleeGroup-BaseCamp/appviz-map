class Rectangle extends Element {
  #width;
  #height;
  #title;

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
      this.#title ? this.#getDisplayableTitle() : "No title",
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

  #getMaxCharacters() {
    let numOfCharacters = 1;
    while (
      numOfCharacters < this.#title.length &&
      textWidth(this.#title.slice(0, numOfCharacters)) < this.#width - textWidth('m')
    ) {
      numOfCharacters++;
    }
    return numOfCharacters;
  }

  #getDisplayableTitle() {
    const numOfCharacters = this.#getMaxCharacters()
    return numOfCharacters == this.#title.length ? this.#title : this.#title.slice(0, numOfCharacters - 3) + "..."
  }
}
