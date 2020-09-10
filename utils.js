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

//Temporary function for testing purposes only.
const initLayers = () => {
  let layer1 = new Layer(4, 6);
  layer1.addElement(new Element({ row: 2, column: 0, height: 2, width: 3 }));
  layer1.addElement(new Element({ row: 0, column: 2, height: 1, width: 1 }));
  // layer1.addElement(
  //   new Element({ row: 1, column: 4, height: 1, width: 1, shape: HEXAGONE })
  // );
  // layer1.addElement(
  //   new Element({ row: 2, column: 4, height: 1, width: 2, shape: HEXAGONE })
  // );
  let layer2 = new Layer(4, 6);
  layer2.addElement(
    new Element({
      row: 2,
      column: 1,
      height: 1,
      width: 2,
      style: { fill: COLOR_2 },
      level: 1,
      shape: HEXAGONE,
    })
  );
  // layer2.addElement(
  //   new Element(0, 2, 1, 1, (style = { fill: COLOR_2 }), (level = 1))
  // );
  return [layer1, layer2];
};
