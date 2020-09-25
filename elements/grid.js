class Grid extends Element {
  constructor() {
    super(0, 0);

    // Temporary: Remove once styles are externalised
    this._style = GRID_STYLE;
  }

  render() {
    push();
    this._applyStyle();
    translate(this._x, this._y);
    for (let i = 0; i < 12; i++) {
      line(0, (canvaSize / 12) * i, canvaSize, (canvaSize / 12) * i);
    }
    for (let j = 0; j < 12; j++) {
      line((canvaSize / 12) * j, 0, (canvaSize / 12) * j, canvaSize);
    }
    pop();
  }

  contains(x, y) {
    return false;
  }
}
