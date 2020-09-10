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
    prevHoveredElement.style.fill = COLOR_1;
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

//Temporary function for testing purposes only.
const initLayers = () => {
  let layer1 = new Layer(4, 6);
  layer1.addElement(
    new Rectangle({ column: 0, row: 2, numOfColumns: 1, numOfRows: 2 })
  );
  // let layer2 = new Layer(4, 6);
  return [layer1];
};
