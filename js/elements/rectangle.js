class Rectangle extends Element {

  constructor(width, height) {
    super();
    this._height = height;
    this._width = width;
  }

  render() {
    rect(0, 0, this._width, this._height);
  }

  contains(x, y) {
    return x > 0 &&
      x < this._width &&
      y > 0 &&
      y < this._height;
  }
}