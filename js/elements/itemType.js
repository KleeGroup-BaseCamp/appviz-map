class ItemType extends Element {
  #itemType;
  #number;
  #width;
  #textAscent;
  #MAX_VALUE;
  constructor(itemType, number, width, style) {
    super();
    this.#itemType = itemType;
    this.#number = number;
    this.#width = width;
    this._style = {
      ...this._style,
      ...style
    };
    this.#MAX_VALUE = 20
  }

  render(x, y) {
    this._applyStyle();
    this.#renderName();
    this.#renderBar();
  }

  #renderName() {
    rectMode(CENTER);
    noStroke();
    fill(this._style.font.fill);
    this.#textAscent = textAscent();
    if (this.#itemType == "dt") text(icons.dt, 10, 0);
    else text(icons.tk, 10, 0);
    text("0", 40, 0)
    text(this.#MAX_VALUE.toString(), this.#width - 25, 0)
  }

  #renderBar() {
    const MAX_VALUE = 20; // TODO : determiner cette valeur dans le notebookHandler
    const start = 55;
    const end = 35;
    const length = this.#width - start - end;
    strokeWeight(4);
    stroke(...this._style.setting.default.stroke, 100);
    line(start, -this.#textAscent / 2, this.#width - end, -this.#textAscent / 2);
    stroke(this._style.setting.default.stroke);
    line(
      start,
      -this.#textAscent / 2,
      start + (this.#number / MAX_VALUE) * length,
      -this.#textAscent / 2
    );
  }

  contains(x, y) {
    return false;
  }
}