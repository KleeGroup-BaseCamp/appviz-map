class Element {
  _state;

  constructor() {
    this._state = "default";
  }

  setStyle(state) {
    if (state == "hover") this._state = "hover";
    else this._state = "default";
  }

  render() {
    //This method must be overridden
  }

  contains(x, y) {
    return false;
  }
}
