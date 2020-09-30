class ItemType extends Element {
  #itemType;
  #number;
  #width;
  #textAscent;
  constructor(itemType, number, width, style) {
    super();
    this.#itemType = itemType;
    this.#number = number;
    this.#width = width;
    this._style = {
      ...this._style,
      ...style
    };
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
    if (this.#itemType == "dt") text(icons.dt, 0, 0);
    else text(icons.tk, 0, 0);
  }

  #renderBar() {
    const MAX_VALUE = 20; // TODO : determiner cette valeur dans le notebookHandler
    const length = this.#width - 35 - 25;
    strokeWeight(4);
    stroke(...this._style.setting.default.stroke, 100);
    line(25, -this.#textAscent / 2, this.#width - 35, -this.#textAscent / 2);
    stroke(this._style.setting.default.stroke);
    line(
      25,
      -this.#textAscent / 2,
      25 + (this.#number / MAX_VALUE) * length,
      -this.#textAscent / 2
    );
  }

  contains(x, y) {
    return false;
  }
}