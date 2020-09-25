class ItemType extends Element {
  #itemTypeName; // Use icon later
  #number;
  constructor(itemTypeName, number, style) {
    super();
    this.#itemTypeName = itemTypeName;
    this.#number = number;
    this._style = { ...this._style, ...style };
  }

  render() {
    this._applyStyle();
    this.#renderName();
  }

  #renderName() {
    push();
    rectMode(CENTER);
    textSize(14);
    noStroke();
    fill(255);
    textFont("Helvetica");
    text(`${this.#itemTypeName}(${this.#number})`, 0, textAscent());
    pop();
  }

  contains(x, y) {
    return false;
  }
}
