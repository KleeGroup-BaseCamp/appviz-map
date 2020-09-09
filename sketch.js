// Layers
let layer1 = new Layer(4, 6);
layer1.addElement(new Element({ row: 2, column: 0, height: 2, width: 3 }));
layer1.addElement(new Element({ row: 0, column: 2, height: 1, width: 1 }));
layer1.addElement(
  new Element({ row: 1, column: 4, height: 1, width: 1, shape: HEXAGONE })
);
layer1.addElement(
  new Element({ row: 2, column: 4, height: 1, width: 2, shape: HEXAGONE })
);
// let layer2 = new Layer(4, 6);
// layer2.addElement(
//   new Element(2, 0, 1, 2, (style = { fill: COLOR_2 }), (level = 1))
// );
// layer2.addElement(
//   new Element(0, 2, 1, 1, (style = { fill: COLOR_2 }), (level = 1))
// );

const map = new Map(null, null, null, [layer1]);

let prevHoveredElement = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30, 61, 116);
  map.render();
  // frameRate(5);
}

function draw() {
  handleHover();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(30, 61, 116);
  map.render();
}
