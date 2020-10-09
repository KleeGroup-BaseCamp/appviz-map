class ItemType extends Element {
  #itemType;
  #number;
  #width;
  #MAX_VALUE;
  constructor(itemType, number, width, max_value = 20) {
    super();
    this.#itemType = itemType;
    this.#number = number;
    this.#width = width;
    this.#MAX_VALUE = max_value
  }

  render(x, y) {
    this.#renderName();
    this.#renderBar();
  }

  #renderName() {
    rectMode(CENTER);
    noStroke();
    fill(style.getTextFill());
    textSize(style.getFontSize("xs"))
    textFont(style.getFont(true))
    text(style.getIcon(this.#itemType), 10, 0);
    text("0", 40, 0)
    text(this.#MAX_VALUE.toString(), this.#width - 25, 0)
  }

  #renderBar() {
    const start = 55;
    const end = 35;
    const length = this.#width - start - end;
    strokeWeight(4);
    stroke(...style.getPrimaryBorderColor(), 100);
    line(start, -textAscent() / 2, this.#width - end, -textAscent() / 2);
    stroke(style.getPrimaryBorderColor());
    line(
      start,
      -textAscent() / 2,
      start + (this.#number / this.#MAX_VALUE) * length,
      -textAscent() / 2
    );
  }

  contains(x, y) {
    return false;
  }
}