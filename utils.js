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
      if (element.isHovered(mouseX, mouseY)) return element;
    }
  }
  return null;
};

const handleHover = () => {
  let element = findHoveredElement();

  if (prevHoveredElement) {
    prevHoveredElement.color = [100, 203, 220];
  }
  if (element) {
    element.color = [255];
    map.render();
  }
  prevHoveredElement = element;
};
