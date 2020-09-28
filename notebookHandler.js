class NotebookHandler {
  types = { Dt: "objects", Tk: "tasks" };
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
      for (let typePrefix in this.types) {
        if (sketchName.slice(0, 2) === typePrefix)
          this.#extractType(domains, sketchName)
      }
    });
    return domains;
  }

  #extractType(domains, sketchName) {
    let typePrefix = sketchName.slice(0, 2)
    let domainName = this.notebook.sketches[sketchName].packageName.split(
      "."
    )[2];
    if (domains[domainName]) {
      if (domains[domainName][this.types[typePrefix]])
        domains[domainName][this.types[typePrefix]].push(sketchName);
      else domains[domainName][this.types[typePrefix]] = [sketchName];
    } else domains[domainName] = { [this.types[typePrefix]]: [sketchName] };
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
        new Rectangle(width, height, zoneName, styles.zones),
        x,
        y
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
          width - padding * 2,
          height - padding * 2,
          groupName,
          styles.groups
        ),
        x + padding,
        y + padding
      );
      let top = y + padding + 40;
      let bottom = y + height - padding - 10;
      itemsLayerBuilder
        .addElement(
          new ItemType(
            "Dt",
            domains[groupName].objects ? domains[groupName].objects.length : 0,
            width - padding * 2,
            styles.items
          ),
          x + padding * 2,
          top + (bottom - top) / 4
        )
        .addElement(
          new ItemType(
            "Tk",
            domains[groupName].tasks ? domains[groupName].tasks.length : 0,
            width - padding * 2,
            styles.items
          ),
          x + padding * 2,
          top + (3 * (bottom - top)) / 4
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
