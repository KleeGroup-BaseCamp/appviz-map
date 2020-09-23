class Rectangle extends Element {
  #title;
  #height;
  #width;
  constructor(x, y, width, height, title) {
    super(x, y);
    this.#height = height;
    this.#width = width;
    this.#title = title;
  }

  render() {
    push();
    this._applyStyle();
    translate(this._x, this._y);
    rect(0, 0, this.#width, this.#height);
    this.#renderTitle();
    pop();
  }

  #renderTitle() {
    if (this.#title) {
      push();
      textSize(16);
      noStroke();
      fill(255);
      textAlign(CENTER);
      textFont("Helvetica");
      text(this.#title, 0, 5, this.#width);
      pop();
    }
  }

  contains(x, y) {
    const lx = x- this._x;
    const ly = y - this._y;
    
    return lx > 0 
    && lx < this.#width 
    && ly > 0 
    && ly < this.#height;
  }
}
