let vizMap;
let prevHoveredElement;
let loading = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fetch("./notebook.json")
    .then((res) => res.json())
    .then((notebook) => {
      vizMap = new Map(null, null, notebook);
      vizMap.render();
      loading = false;
    });
  // console.log(vizMap);
  // frameRate(5);
}

function draw() {
  if (!loading) {
    vizMap.selectElement(mouseX, mouseY);
    vizMap.handleSelection();
    vizMap.render();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
