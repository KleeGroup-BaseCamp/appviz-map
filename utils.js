const tileSize = (rows, columns) => {
  return { rowSize: windowHeight / rows, columnSize: windowWidth / columns };
};
const upperLeftPixel = (rows, columns, row, column) => {
  return {
    x: column * tileSize(rows, columns).columnSize,
    y: row * tileSize(rows, columns).rowSize,
  };
};

const findHoveredElement = () => {
  for (let layer of map.layers) {
    for (let element of layer.elements) {
      if (element.isHovered(mouseX, mouseY)) return [element, layer];
    }
  }
  return [null];
};

const handleHover = () => {
  let [element, layer] = findHoveredElement();
  if (prevHoveredElement.element) {
    fill(100, 203, 220);
    prevHoveredElement.element.render(prevHoveredElement.layer);
  }
  if (element) {
    fill(255);
    element.render(layer);
  }
  prevHoveredElement = { element, layer };
};
