class View {
  constructor() {}
  renderMap(map) {
    for (let layer of map.layers) {
      strokeWeight(4);
      this.renderGrid(layer.rows, layer.columns);
      this.renderLayer(layer);
    }
  }
  renderLayer(layer) {
    for (let element of layer.elements) {
      this.renderElement(element, layer);
    }
  }
  renderElement(element, layer) {
    fill(122, 203, 220);
    const { x, y } = upperLeftPixel(
      layer.rows,
      layer.columns,
      element.layerRow,
      element.layerColumn
    );
    const { rowSize, columnSize } = tileSize(layer.rows, layer.columns);
    rect(x, y, columnSize * element.width, rowSize * element.height);
  }

  renderGrid(rows, columns) {
    const { rowSize, columnSize } = tileSize(rows, columns);
    stroke(255);
    for (let i = 0; i < rows; i++) {
      line(0, rowSize * (i + 1), windowWidth, rowSize * (i + 1));
    }
    for (let j = 0; j < columns; j++) {
      line(columnSize * (j + 1), 0, columnSize * (j + 1), windowHeight);
    }
  }
}
