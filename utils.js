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
    prevHoveredElement.style.fill = [100, 203, 220];
  }
  if (element) {
    element.style.fill = [255];
    map.render();
  }
  map.render();
  prevHoveredElement = element;
};

const applyStyle = (style) => {
  if (style.stroke) stroke(style.stroke);
  if (style.strokeWeight) strokeWeight(style.strokeWeight);
  if (style.fill) fill(...style.fill);
};
