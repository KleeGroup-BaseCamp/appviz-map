class Element {
  _x;
  _y;
  _style = DEFAULT_STYLE; // Hardcode init style

  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  setDefaultStyle() {
    this._style = DEFAULT_STYLE; // Hardcode default style
  }

  hover() {
    this._style = HOVER_STYLE; // Hardcode hover style
  }

  _applyStyle() {
    stroke(this._style.stroke);
    strokeWeight(this._style.strokeWeight);
    fill(this._style.fill);
  }

  render() {
    //This method must be overridden
  }

  contains(x, y) {
    //This method must  be overridden
  }
}
