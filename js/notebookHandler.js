class NotebookHandler {
  #types = { dt: "objects", tk: "tasks" };
  constructor(notebookPath) {
    this.notebook = loadJSON(notebookPath);
  }

  handle(fake) {
    const domains = this.#extractDomains();
    if (!groups) {
      return this.#generateDomainsMap(domains, fake);
    }
    else {
      const groupName = "basemanagement"
      return this.#generateGroupMap(domains, fake, groupName)
    }
  }

  #extractType(domains, sketchName) {
    const typePrefix = sketchName.slice(0, 2).toLowerCase()
    const domainName = this.notebook.sketches[sketchName].packageName.split(
      "."
    )[2];
    if (domains[domainName]) {
      if (domains[domainName][this.#types[typePrefix]])
        domains[domainName][this.#types[typePrefix]].push(sketchName);
      else domains[domainName][this.#types[typePrefix]] = [sketchName];
    } else domains[domainName] = { [this.#types[typePrefix]]: [sketchName] };
  }

  #extractDomains() {
    const domains = {};
    Object.keys(this.notebook.sketches).map((sketchName) => {
      for (const typePrefix in this.#types) {
        if (sketchName.slice(0, 2).toLowerCase() === typePrefix)
          this.#extractType(domains, sketchName)
      }
    });
    return domains;
  }

  #generateDomainsMap(domains, fake) {
    const backgroundLayerBuilder = new LayerBuilder();
    const zonesLayerBuilder = new LayerBuilder();
    const groupsLayerBuilder = new LayerBuilder();
    const itemsLayerBuilder = new LayerBuilder();
    const gridLayerBuilder = new LayerBuilder();

    backgroundLayerBuilder.addElement(new Background(BACKGROUND_COLOR));
    gridLayerBuilder.addElement(new Grid(12, 12, styles.domainsView.grid));

    Object.keys(fake.zones).forEach((zoneName) => {
      const zone = fake.zones[zoneName];
      const { x, y, width, height } = this.#getPixels(
        zone.row,
        zone.column,
        zone.numOfRows,
        zone.numOfColumns
      );
      zonesLayerBuilder.addElement(
        new Rectangle(width, height, this.#firstCharUpperCase(zoneName), styles.domainsView.zones),
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
          styles.domainsView.groups
        ),
        x + padding,
        y + padding
      );
      const top = y + padding + 40; // TO DO : Use title textAscent to compute
      const bottom = y + height - padding - 10;
      Object.keys(this.#types).forEach((typePrefix, index) => {
        itemsLayerBuilder
          .addElement(
            new ItemType(
              typePrefix,
              domains[groupName][this.#types[typePrefix]] ? domains[groupName][this.#types[typePrefix]].length : 0,
              width - padding * 2,
              styles.domainsView.items
            ),
            x + padding * 2,
            top + (2 * index + 1) * (bottom - top) / (2 * Object.keys(this.#types).length)
          );
      })
    });

    return new MapBuilder()
      .addLayer(backgroundLayerBuilder.build())
      .addLayer(zonesLayerBuilder.build())
      .addLayer(groupsLayerBuilder.build())
      .addLayer(itemsLayerBuilder.build())
      .addLayer(gridLayerBuilder.build())
      .build();
  }

  #generateGroupMap(domains, fake, groupName) {
    const backgroundLayerBuilder = new LayerBuilder();
    const groupLayerBuilder = new LayerBuilder();
    const itemTypesLayerBuilder = new LayerBuilder();
    const itemsLayerBuilder = new LayerBuilder();
    backgroundLayerBuilder.addElement(new Background(BACKGROUND_COLOR));
    groupLayerBuilder.addElement(
      new Rectangle(canvasSize, canvasSize, groupName, styles.groupView.group),
      0,
      0
    );
    Object.keys(this.#types).forEach((typePrefix, typeIndex) => {
      const padding = 10;
      const x = padding
      const y = (typeIndex * 300) + 100
      const width = canvasSize - 2 * padding;
      const itemsPerRow = 4;
      const itemHeight = 30;
      const itemWidth = (width - padding * (itemsPerRow + 1)) / itemsPerRow
      let items = domains[groupName][this.#types[typePrefix]]
      const height = 40 + Math.ceil(items.length / itemsPerRow) * (itemHeight + padding)
      itemTypesLayerBuilder.addElement(
        new Rectangle(
          width,
          height,
          this.#firstCharUpperCase(this.#types[typePrefix]) + " " + icons[typePrefix],
          styles.groupView.itemType
        ),
        x,
        y
      )
      items.forEach((item, itemIndex) => {
        itemsLayerBuilder.addElement(
          new Rectangle(itemWidth, itemHeight, item.slice(2, item.length), styles.groupView.item, "center"),
          x + (((itemWidth + padding) * itemIndex + padding) % (width - padding)),
          y + 40 + Math.floor(itemIndex / itemsPerRow) * (itemHeight + padding)
        )
      })
    })
    return new MapBuilder()
      .addLayer(backgroundLayerBuilder.build())
      .addLayer(groupLayerBuilder.build())
      .addLayer(itemTypesLayerBuilder.build())
      .addLayer(itemsLayerBuilder.build())
      .build()
  }

  #getPixels(row, column, numOfRows, numOfColumns) {
    const x = (column * canvasSize) / 12;
    const y = (row * canvasSize) / 12;
    const width = (numOfColumns * canvasSize) / 12;
    const height = (numOfRows * canvasSize) / 12;
    return { x, y, width, height };
  }

  #firstCharUpperCase(string) {
    return string[0].toUpperCase() + string.slice(1, string.length)
  }
}
