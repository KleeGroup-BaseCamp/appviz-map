//Temporary function for testing purposes only.
const initLayers = () => {
  let layer1 = new Layer(4, 6);
  layer1.addElement(
    new Rectangle({ column: 0, row: 2, numOfColumns: 2, numOfRows: 2 })
  );
  layer1.addElement(
    new Hexagon({ column: 2, row: 1, numOfColumns: 1, numOfRows: 1 })
  );
  layer1.addElement(
    new Square({ column: 4, row: 1, numOfColumns: 1, numOfRows: 1 })
  );
  let layer2 = new Layer(4, 6);
  layer2.addElement(
    new Rectangle({ column: 1, row: 2, numOfColumns: 1, numOfRows: 1 })
  );
  layer2.addElement(
    new Rectangle({ column: 0, row: 2, numOfColumns: 1, numOfRows: 1 })
  );
  layer2.addElement(
    new Rectangle({ column: 1, row: 2, numOfColumns: 1, numOfRows: 1 })
  );
  layer2.addElement(
    new Hexagon({ column: 2, row: 1, numOfColumns: 1, numOfRows: 1 })
  );
  let layer3 = new Layer(4, 6);
  layer3.addElement(
    new Hexagon({ column: 0, row: 2, numOfColumns: 1, numOfRows: 1 })
  );

  layer4 = new Layer(15, 12);
  layer4.addElement(
    new Rectangle({ column: 0, row: 10, numOfColumns: 4, numOfRows: 5 })
  );
  layer5 = new Layer(15, 12);
  layer5.addElement(
    new Square({ column: 0, row: 11, numOfColumns: 1, numOfRows: 2 })
  );
  layer5.addElement(
    new Square({ column: 1, row: 11, numOfColumns: 1, numOfRows: 2 })
  );
  layer5.addElement(
    new Square({ column: 2, row: 11, numOfColumns: 1, numOfRows: 2 })
  );
  layer5.addElement(
    new Square({ column: 3, row: 11, numOfColumns: 1, numOfRows: 2 })
  );
  layer5.addElement(
    new Square({ column: 0, row: 13, numOfColumns: 1, numOfRows: 2 })
  );
  layer5.addElement(
    new Square({ column: 1, row: 13, numOfColumns: 1, numOfRows: 2 })
  );
  layer5.addElement(
    new Square({ column: 2, row: 13, numOfColumns: 1, numOfRows: 2 })
  );
  layer5.addElement(
    new Square({ column: 3, row: 13, numOfColumns: 1, numOfRows: 2 })
  );
  // return [layer1, layer2, layer3];
  return [layer4, layer5];
};
