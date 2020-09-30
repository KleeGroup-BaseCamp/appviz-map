class Rectangle extends Element {
  #width;
  #height;
  #titleOnTop;
  #hasBar

  constructor(width, height, title, style, titleOnTop = true, hasBar = false) {
    super();
    this.#height = height;
    this.#width = width;
    this.title = title;
    this._style = {
      ...this._style,
      ...style
    };
    this.#titleOnTop = titleOnTop;
    this.#hasBar = hasBar
  }

  render() {
    this._applyStyle();
    rect(0, 0, this.#width, this.#height);
    this.#renderBar()
    this.#renderTitle();
  }

  #renderTitle() {
    noStroke();
    fill(this._style.font.fill);
    if (this.#titleOnTop) {
      textAlign(CENTER);
      text(
        this.title ? this.#getDisplayableTitle() : "No title",
        0,
        textAscent() + 15,
        this.#width
      );
    } else {
      textAlign(CENTER, CENTER);
      text(
        this.title ? this.#getDisplayableTitle() : "No title",
        0,
        0,
        this.#width,
        this.#height
      );
    }
  }

  #renderBar() {
    if (this.#hasBar)
      line(this.#width / 4, textAscent() + textDescent() + 20, this.#width * 3 / 4, textAscent() + textDescent() + 20)
  }

  contains(x, y) {
    return x > 0 &&
      x < this.#width &&
      y > 0 &&
      y < this.#height;
  }

  #getMaxCharacters() {
    let numOfCharacters = 1;
    while (
      numOfCharacters < this.title.length &&
      textWidth(this.title.slice(0, numOfCharacters)) <
      this.#width - textWidth("m")
    ) {
      numOfCharacters++;
    }
    return numOfCharacters;
  }

  #getDisplayableTitle() {
    const numOfCharacters = this.#getMaxCharacters();
    return numOfCharacters == this.title.length ?
      this.title :
      this.title.slice(0, numOfCharacters - 3) + "...";
  }
}