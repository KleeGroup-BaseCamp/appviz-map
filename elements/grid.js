class Grid extends Element {
  constructor(style) {
    super();

    // Temporary: Remove once styles are externalised
    this._style = { ...this._style, ...style };
  }

  render() {
    this._applyStyle();
    for (let i = 0; i < 12; i++) {
      line(0, (canvaSize / 12) * i, canvaSize, (canvaSize / 12) * i);
    }
    for (let j = 0; j < 12; j++) {
      line((canvaSize / 12) * j, 0, (canvaSize / 12) * j, canvaSize);
    }
  }
}
