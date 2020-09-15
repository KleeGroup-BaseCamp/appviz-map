//Temporary function for testing purposes only.
const initLayers = () => {
  let layer1 = new Layer(4, 6)
    .withElement(new Rectangle({ column: 0, row: 2, numOfColumns: 2, numOfRows: 2 }))
    .withElement(new Hexagon({ column: 2, row: 1, numOfColumns: 1, numOfRows: 1 }))
    .withElement(new Square({ column: 4, row: 1, numOfColumns: 1, numOfRows: 1 }));

  let layer2 = new Layer(4, 6)
    .withElement( new Rectangle({ column: 0, row: 2, numOfColumns: 1, numOfRows: 1 }))
    .withElement( new Rectangle({ column: 1, row: 2, numOfColumns: 1, numOfRows: 1 }))
    .withElement( new Hexagon({ column: 2, row: 1, numOfColumns: 1, numOfRows: 1 }));

  let layer3 = new Layer(4, 6)
    .withElement( new Hexagon({ column: 0, row: 2, numOfColumns: 1, numOfRows: 1 }));

  return [layer1, layer2, layer3];
};
