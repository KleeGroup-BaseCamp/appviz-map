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
  // frameRate(5);
}

function draw() {
  if (!loading) {
    vizMap.findElement(mouseX, mouseY);
    vizMap.handleHover();
    vizMap.render();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
