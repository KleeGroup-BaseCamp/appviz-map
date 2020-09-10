let vizMap;
let prevHoveredElement = null;
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
    handleHover();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  vizMap.render();
}
