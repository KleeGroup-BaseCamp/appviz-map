class NotebookHandler {
  types = { Dt: "objects", Tk: "tasks" };
  constructor(notebookPath) {
    this.notebook = loadJSON(notebookPath);
  }

  handle(fake) {
    const domains = this.#extractDomains();
    return this.#generateMapFromDomains(domains, fake);
  }

  #extractDomains() {
    const domains = {};
    Object.keys(this.notebook.sketches).map((sketchName) => {
      for (const typePrefix in this.types) {
        if (sketchName.slice(0, 2) === typePrefix)
          this.#extractType(domains, sketchName)
      }
    });
    return domains;
  }

  #extractType(domains, sketchName) {
    const typePrefix = sketchName.slice(0, 2)
    const domainName = this.notebook.sketches[sketchName].packageName.split(
      "."
    )[2];
    if (domains[domainName]) {
      if (domains[domainName][this.types[typePrefix]])
        domains[domainName][this.types[typePrefix]].push(sketchName);
      else domains[domainName][this.types[typePrefix]] = [sketchName];
    } else domains[domainName] = { [this.types[typePrefix]]: [sketchName] };
  }

  #generateMapFromDomains(domains, fake) {
    const backgroundLayerBuilder = new LayerBuilder();
    const zonesLayerBuilder = new LayerBuilder();
    const groupsLayerBuilder = new LayerBuilder();
    const itemsLayerBuilder = new LayerBuilder();
    const gridLayerBuilder = new LayerBuilder();

    backgroundLayerBuilder.addElement(new Background(BACKGROUND_COLOR));
    gridLayerBuilder.addElement(new Grid(styles.grid));

    Object.keys(fake.zones).forEach((zoneName) => {
      const zone = fake.zones[zoneName];
      const { x, y, width, height } = this.#getPixels(
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
      const group = fake.groups[groupName];
      const { x, y, width, height } = this.#getPixels(
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
      const top = y + padding + 40;
      const bottom = y + height - padding - 10;
      Object.keys(this.types).forEach((typePrefix, index) => {
        itemsLayerBuilder
          .addElement(
            new ItemType(
              typePrefix,
              domains[groupName][this.types[typePrefix]] ? domains[groupName][this.types[typePrefix]].length : 0,
              width - padding * 2,
              styles.items
            ),
            x + padding * 2,
            top + (2 * index + 1) * (bottom - top) / (2 * Object.keys(this.types).length)
          );
      })
    });

    return  new MapBuilder()
      .addLayer(backgroundLayerBuilder.build())
      .addLayer(zonesLayerBuilder.build())
      .addLayer(groupsLayerBuilder.build())
      .addLayer(itemsLayerBuilder.build())
      .addLayer(gridLayerBuilder.build())
      .build();
  }

  #getPixels(row, column, numOfRows, numOfColumns) {
    const x = (column * canvaSize) / 12;
    const y = (row * canvaSize) / 12;
    const width = (numOfColumns * canvaSize) / 12;
    const height = (numOfRows * canvaSize) / 12;
    return { x, y, width, height };
  }
}
