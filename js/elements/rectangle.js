class Rectangle extends Element {
  _width;
  _height;

  constructor(width, height) {
    super();
    this._width = width;
    this._height = height;
  }

  contains(x, y) {
    return x > 0 &&
      x < this._width &&
      y > 0 &&
      y < this._height;
  }
}