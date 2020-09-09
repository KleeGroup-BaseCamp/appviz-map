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
  for (let layer of map.layers.slice().reverse()) {
    for (let element of layer.elements) {
      if (element.isHovered(mouseX, mouseY)) return element;
    }
  }
  return null;
};

const handleHover = () => {
  let element = findHoveredElement();

  if (prevHoveredElement) {
    if (prevHoveredElement.level === 0) prevHoveredElement.style.fill = COLOR_1;
    else prevHoveredElement.style.fill = COLOR_2;
    map.render();
  }
  if (element) {
    element.style.fill = HOVER_COLOR;
    map.render();
  }

  prevHoveredElement = element;
};

const applyStyle = (style) => {
  if (style.stroke) stroke(style.stroke);
  if (style.strokeWeight) strokeWeight(style.strokeWeight);
  if (style.fill) fill(...style.fill);
};
