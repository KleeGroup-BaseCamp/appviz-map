class NotebookHandler {
  constructor(notebookPath) {
    this.notebook = loadJSON(notebookPath);
  }

  handle(fake) {
    let domains = this.#extractDomains();
    return this.#generateMapFromDomains(domains, fake);
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
    return domains;
  }

  #generateMapFromDomains(domains, fake) {
    let backgroundLayerBuilder = new LayerBuilder();
    let zonesLayerBuilder = new LayerBuilder();
    let groupsLayerBuilder = new LayerBuilder();
    let itemsLayerBuilder = new LayerBuilder();
    let gridLayerBuilder = new LayerBuilder();

    backgroundLayerBuilder.addElement(new Background(BACKGROUND_COLOR));
    gridLayerBuilder.addElement(new Grid(styles.grid));

    Object.keys(fake.zones).forEach((zoneName) => {
      let zone = fake.zones[zoneName];
      let { x, y, width, height } = this.#getPixels(
        zone.row,
        zone.column,
        zone.numOfRows,
        zone.numOfColumns
      );
      zonesLayerBuilder.addElement(
        new Rectangle(x, y, width, height, zoneName, styles.zones)
      );
    });

    Object.keys(fake.groups).forEach((groupName) => {
      const padding = 10;
      let group = fake.groups[groupName];
      let { x, y, width, height } = this.#getPixels(
        group.row,
        group.column,
        group.numOfRows,
        group.numOfColumns
      );
      groupsLayerBuilder.addElement(
        new Rectangle(
          x + padding,
          y + padding,
          width - padding * 2,
          height - padding * 2,
          groupName,
          styles.groups
        )
      );
      itemsLayerBuilder
        .addElement(
          new ItemType(
            x + padding + 20,
            y + padding + 50,
            "Dt",
            domains[groupName].objects ? domains[groupName].objects.length : 0,
            styles.items
          )
        )
        .addElement(
          new ItemType(
            x + padding + 20,
            y + padding + 100,
            "Tk",
            domains[groupName].tasks ? domains[groupName].tasks.length : 0,
            styles.items
          )
        );
    });

    let mapBuilder = new MapBuilder();
    mapBuilder
      .addLayer(backgroundLayerBuilder.build())
      .addLayer(zonesLayerBuilder.build())
      .addLayer(groupsLayerBuilder.build())
      .addLayer(itemsLayerBuilder.build())
      .addLayer(gridLayerBuilder.build());
    return mapBuilder.build();
  }

  #getPixels(row, column, numOfRows, numOfColumns) {
    let x = (column * canvaSize) / 12;
    let y = (row * canvaSize) / 12;
    let width = (numOfColumns * canvaSize) / 12;
    let height = (numOfRows * canvaSize) / 12;
    return { x, y, width, height };
  }
}
