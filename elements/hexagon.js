class Hexagon extends Element {
  constructor({ column, row, numOfColumns, numOfRows }) {
    super({
      column,
      row,
      numOfColumns,
      numOfRows,
    });
  }

  getCircumcircle() {
    const { upperLeftX, upperLeftY, width, height } = this.getBoundingBox();
    const circumcenterX = upperLeftX + width / 2;
    const circumcenterY = upperLeftY + height / 2;
    const circumradius = min(height, width / cos(30)) / 2;
    return { circumcenterX, circumcenterY, circumradius };
  }

  render() {
    this.applyStyle(this.style);
    const {
      circumcenterX,
      circumcenterY,
      circumradius,
    } = this.getCircumcircle();

    beginShape();
    for (let i = 0; i < 6; i++) {
      vertex(
        circumcenterX + circumradius * cos(90 + 60 * i),
        circumcenterY - circumradius * sin(90 + 60 * i)
      );
    }
    endShape(CLOSE);
  }

  contains(x, y) {
    let contains = true;
    const {
      circumcenterX,
      circumcenterY,
      circumradius,
    } = this.getCircumcircle();
    for (let i = 0; i < 6; i++) {
      contains = true;
      let points = [
        { x: circumcenterX, y: circumcenterY },
        {
          x: circumcenterX + circumradius * cos(30 + 60 * i),
          y: circumcenterY - circumradius * sin(30 + 60 * i),
        },
        {
          x: circumcenterX + circumradius * cos(90 + 60 * i),
          y: circumcenterY - circumradius * sin(90 + 60 * i),
        },
      ];

      for (let j = 0; j < 3; j++) {
        let a =
          points[j].x != points[(j + 1) % 3].x
            ? (points[j].y - points[(j + 1) % 3].y) /
              (points[j].x - points[(j + 1) % 3].x)
            : null;
        let b = a ? points[j].y - a * points[j].x : points[j].x;

        contains =
          contains &&
          (a
            ? (y - a * x - b) *
                (points[(j + 2) % 3].y - a * points[(j + 2) % 3].x - b) >
              0
            : (x - b) * (points[(j + 2) % 3].x - b) > 0);
      }
      if (contains) break;
    }
    return contains;
  }
}
