class Element {
  _x;
  _y;
  _style = DEFAULT_STYLE; // Hardcode init style

  constructor(x, y) {
    this._x = x;
    this._y = y;
    this._style.type = "default";
  }

  setDefaultStyle() {
    this._style.type = "default"; // Hardcode default style
  }

  hover() {
    this._style.type = "hover"; // Hardcode hover style
  }

  _applyStyle() {
    textSize(this._style.font.size);
    textFont(this._style.font.name);
    stroke(this._style.setting[this._style.type].stroke);
    strokeWeight(this._style.setting[this._style.type].strokeWeight);
    fill(this._style.setting[this._style.type].fill);
  }

  render() {
    //This method must be overridden
  }

  contains(x, y) {
    //This method must  be overridden
  }
}
