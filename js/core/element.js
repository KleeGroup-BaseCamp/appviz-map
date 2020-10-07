class Element {
  _state;

  constructor() {
    this._state = "default";
  }

  setStyle(state) {
    if (state == "hover") this._state = "hover";
    else this._state = "default";
  }

  /**
   * This method MUST be overridden
   */
  render() {
    throw 'render method MUST be overridden'
  }

  /**
   * This method CAN be overridden
   */
  contains(x, y) {
    return false;
  }
}
