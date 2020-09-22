class Element {
  _style;
  constructor(style) {
    this._style = style;
  }

  initStyle() {
    this._style = {
      fill: COLORS[0],
      stroke: 255,
      strokeWeight: 2,
    };
  }

  hover() {
    this._style.fill = HOVER_COLOR;
  }

  applyStyle() {
    if (this._style.stroke) stroke(this._style.stroke);
    if (this._style.strokeWeight) strokeWeight(this._style.strokeWeight);
    if (this._style.fill) fill(this._style.fill);
  }

  render() {
    //This method must be overridden
  }

  contains(x, y) {
    //This method must  be overridden
  }
}
