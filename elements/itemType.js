class ItemType extends Element {
  #itemTypeName; // Use icon later
  #number;
  #width;
  #textAscent;
  constructor(itemTypeName, number, width, style) {
    super();
    this.#itemTypeName = itemTypeName;
    this.#number = number;
    this.#width = width;
    this._style = { ...this._style, ...style };
  }

  render(x, y) {
    this._applyStyle();
    this.#renderName();
    this.#renderBar();
  }

  #renderName() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(this._style.font.fill);
    this.#textAscent = textAscent();
    if (this.#itemTypeName == "Dt") text(icons.dt, 0, 0);
    else text(icons.tk, 0, 0);
    pop();
  }

  #renderBar() {
    const MAX_VALUE = 20; // TODO : determiner cette valeur dans le notebookHandler
    const length = this.#width - 35 - 25;
    push();
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
    pop();
  }

  contains(x, y) {
    return false;
  }
}
