class NotebookHandler {
  constructor(notebookPath) {
    this.notebook = loadJSON(notebookPath);
  }

  handle(mapBuilder, fake) {
    let domains = this.#extractDomains();
    this.#generateLayersFromDomains(domains, mapBuilder, fake);
  }

  #extractDomains() {
    let domains = {};
    Object.keys(this.notebook.sketches).map((sketchName) => {
      if (sketchName.slice(0, 2) === "Dt") {
        // TO DO : Use a function updateDomains() to simplify code
        let domainName = this.notebook.sketches[sketchName].packageName.split(
          "."
        )[2];
        if (domains[domainName]) {
          if (domains[domainName].objects)
            domains[domainName].objects.push(sketchName);
          else domains[domainName].objects = [sketchName];
        } else domains[domainName] = { objects: [sketchName] };
      } else if (sketchName.slice(0, 2) === "Tk") {
        let domainName = this.notebook.sketches[sketchName].packageName.split(
          "."
        )[2];
        if (domains[domainName]) {
          if (domains[domainName].tasks)
            domains[domainName].tasks.push(sketchName);
          else domains[domainName].tasks = [sketchName];
        } else domains[domainName] = { tasks: [sketchName] };
      }
    });
    // console.log(domains);
    return domains;
  }

  #generateLayersFromDomains(domains, mapBuilder, fake) {
    const padding = 10;
    let zonesLayer = mapBuilder.addLayer();
    let groupsLayer = mapBuilder.addLayer();

    Object.keys(fake.zones).forEach((zoneName) => {
      let zone = fake.zones[zoneName];
      let { x, y, width, height } = this.#getPixels(
        zone.row,
        zone.column,
        zone.numOfRows,
        zone.numOfColumns
      );
      zonesLayer.addElement(new Rectangle(x, y, width, height, zoneName));
    });
    Object.keys(fake.groups).forEach((groupName) => {
      let group = fake.groups[groupName];
      let { x, y, width, height } = this.#getPixels(
        group.row,
        group.column,
        group.numOfRows,
        group.numOfColumns
      );
      groupsLayer.addElement(
        new Rectangle(
          x + padding,
          y + padding,
          width - padding * 2,
          height - padding * 2,
          groupName
        )
      );
    });
  }

  #getPixels(row, column, numOfRows, numOfColumns) {
    let x = (column * windowWidth) / 12;
    let y = (row * windowHeight) / 12;
    let width = (numOfColumns * windowWidth) / 12;
    let height = (numOfRows * windowHeight) / 12;
    return { x, y, width, height };
  }
}
