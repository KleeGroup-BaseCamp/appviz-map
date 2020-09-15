class Map {
  #selected = null;
  #layers = initLayers();

  constructor(state, config, notebook) {
     // For testing purposes only
    let level = 0;
    let domains = this.extractDomains(notebook);
    for (let layer of this.#layers) {
      layer.level = level;
      layer.initStyle();
      level++;
    }
  }

  render() {
    this.#renderBackground();
    this.#renderGrid();
    this.#renderLayers();
   }

  #renderBackground(){
    background(3, 4, 94);
  }

  #renderLayers(){
    this.#layers.forEach(layer => layer.render());
  }

  #renderGrid(){
   for (let layer of this.#layers) {
      layer.renderGrid(); // Drawing grid for testing purposes only
    }
  }

   /*
   * finds the element positionned in x, y
   */
  findElement(x, y) {
    for (let layer of this.#layers.slice().reverse()) {
      let element = layer.findElement(x, y);
      if (element) {
        return element;
      }
    }
    return null;
  }

  /*
    Selects an element on the map
    The previous selected element is unselected.
    Each element is responsible for its style
  */
  select(element) {
    if (this.#selected){
      this.#selected.initStyle();
    }
    if (element){
      element.hover();
    }
    this.#selected = element;  
  }

  extractDomains(notebook) {
    let domains = {};
    Object.keys(notebook).map((sketchName) => {
      if (sketchName.slice(0, 2) === "Dt") {
        // TO DO : Use a function updateDomains() to simplify code
        let domainName = notebook[sketchName].packageName.split(".")[2];
        if (domains[domainName]) {
          if (domains[domainName].objects)
            domains[domainName].objects.push(sketchName);
          else domains[domainName].objects = [sketchName];
        } else domains[domainName] = { objects: [sketchName] };
      } else if (sketchName.slice(0, 2) === "Tk") {
        let domainName = notebook[sketchName].packageName.split(".")[2];
        if (domains[domainName]) {
          if (domains[domainName].tasks)
            domains[domainName].tasks.push(sketchName);
          else domains[domainName].tasks = [sketchName];
        } else domains[domainName] = { tasks: [sketchName] };
      }
    });
    return domains;
  }
}
