class Hexagone extends Element {
  constructor({ column, row, numOfColumns, numOfRows }) {
    super({
      column,
      row,
      numOfColumns,
      numOfRows,
    });
  }

  render() {
    applyStyle(this.style);
    const { x, y, width, height } = this.getBoundingBox();
    const param = height / (2 * sqrt(3));
    beginShape();
    vertex(x + param, y);
    vertex(x + width - param, y);
    vertex(x + width, y + height / 2);
    vertex(x + width - param, y + height);
    vertex(x + param, y + height);
    vertex(x, y + height / 2);
    endShape(CLOSE);
  }

  isHovered(mouseX, mouseY) {
    const { x, y, width, height } = this.getBoundingBox();
    const param = height / (2 * sqrt(3));
    const coefs = {
      upperLeft: {},
      bottomLeft: {},
      upperRight: {},
      bottomRight: {},
    };
    coefs.upperLeft.a = -height / (param * 2);
    coefs.upperLeft.b = y - coefs.upperLeft.a * (x + param);
    coefs.bottomLeft.a = -coefs.upperLeft.a;
    coefs.bottomLeft.b = y + height - coefs.bottomLeft.a * (x + param);
    coefs.upperRight.a = coefs.bottomLeft.a;
    coefs.upperRight.b = y - coefs.upperRight.a * (x + width - param);
    coefs.bottomRight.a = coefs.upperLeft.a;
    coefs.bottomRight.b =
      y + height - coefs.bottomRight.a * (x + width - param);

    return (
      mouseX * coefs.upperLeft.a + coefs.upperLeft.b < mouseY &&
      mouseX * coefs.bottomLeft.a + coefs.bottomLeft.b > mouseY &&
      mouseX * coefs.upperRight.a + coefs.upperRight.b < mouseY &&
      mouseX * coefs.bottomRight.a + coefs.bottomRight.b > mouseY &&
      mouseY > y &&
      mouseY < y + height
    );
  }
}
