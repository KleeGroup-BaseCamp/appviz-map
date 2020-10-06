class NotebookHandler {
  #types = {
    dt: "objects",
    tk: "tasks"
  };

  constructor(notebookPath) {
    this.notebook = loadJSON(notebookPath);
  }

  handle(fake) {
    const domains = this.#extractDomains();
    if (!group) {
      return this.#generateDomainsMap(domains, fake);
    } else {
      return this.#generateGroupMap(domains, group);
    }
  }

  #extractType(domains, sketchName) {
    const typePrefix = sketchName.slice(0, 2).toLowerCase();
    const domainName = this.notebook.sketches[sketchName].packageName.split(
      "."
    )[2];
    const type = this.#types[typePrefix]
    if (domains[domainName]) {
      if (domains[domainName][type]) {
        domains[domainName][type].push(sketchName);
      } else {
        domains[domainName][type] = [sketchName];
      }
    } else {
      domains[domainName] = { [type]: [sketchName] };
    }


  }

  #extractDomains() {
    const domains = {};
    Object.keys(this.notebook.sketches).map((sketchName) => {
      for (const typePrefix in this.#types) {
        if (sketchName.slice(0, 2).toLowerCase() === typePrefix)
          this.#extractType(domains, sketchName);
      }
    });
    return domains;
  }

  #generateDomainsMap(domains, fake) {
    const zonesLayerBuilder = new LayerBuilder();
    const groupsLayerBuilder = new LayerBuilder();

    Object.keys(fake.zones).forEach((zoneName) => {
      const zone = fake.zones[zoneName];
      const {
        x,
        y,
        width,
        height
      } = this.#getPixels(
        zone.row,
        zone.column,
        zone.numOfRows,
        zone.numOfColumns
      );
      zonesLayerBuilder.addElement(
        new ZoneView(
          width,
          height,
          Utils.firstCharUpperCase(zoneName),
        ),
        x,
        y
      );

      Object.keys(zone.groups).forEach((groupName) => {
        const group = zone.groups[groupName];
        const {
          x,
          y,
          width,
          height
        } = this.#getPixels(
          group.row,
          group.column,
          group.numOfRows,
          group.numOfColumns
        );
        const items = Object.keys(this.#types).map((typePrefix) => {
          return {
            prefix: typePrefix,
            frequency:
              domains[groupName][this.#types[typePrefix]]
                ? domains[groupName][this.#types[typePrefix]].length
                : 0
          }
        })
        const padding = this.#getGroupPadding(group, zone)
        groupsLayerBuilder.addElement(
          new Group(
            width - padding.right - padding.left,
            height - padding.top - padding.bottom,
            Utils.firstCharUpperCase(groupName),
            zoneName,
            items
          ),
          x + padding.left,
          y + padding.top
        );
      });
    });



    return new MapBuilder()
      .addLayer(this.#buildBackgroundLayer())
      .addLayer(zonesLayerBuilder.build())
      .addLayer(groupsLayerBuilder.build())
      .addLayer(this.#buildGridLayer())
      .build();
  }

  #buildBackgroundLayer() {
    return new LayerBuilder()
      .addElement(new Background())
      .build();
  }

  #buildGridLayer() {
    return new LayerBuilder()
      .addElement(new Grid(12, 12))
      .build();
  }

  #generateGroupMap(domains, groupName) {
    const itemTypesLayerBuilder = new LayerBuilder();
    const groupLayer = new LayerBuilder()
      .addElement(new GroupView(canvasSize, canvasSize, Utils.firstCharUpperCase(groupName)))
      .build();

    Object.keys(this.#types).forEach((typePrefix, typeIndex) => {
      const padding = { x: 20, y: 50 }

      const height = (canvasSize - 100) / Object.keys(this.#types).length - padding.y;
      const items = domains[groupName][this.#types[typePrefix]] ?? []
      itemTypesLayerBuilder.addElement(
        new ItemTypeDetail(
          canvasSize - 2 * padding.x,
          height,
          (this.#types[typePrefix] == "objects" ?
            "Data" :
            Utils.firstCharUpperCase(this.#types[typePrefix])) +
          " " + getIcon(typePrefix),
          items
        ),
        padding.x,
        100 + (height + padding.y) * typeIndex
      );
    });
    return new MapBuilder()
      .addLayer(this.#buildBackgroundLayer())
      .addLayer(groupLayer)
      .addLayer(itemTypesLayerBuilder.build())
      .addLayer(this.#buildGridLayer())
      .build();
  }

  #getPixels(row, column, numOfRows, numOfColumns) {
    const x = (column * canvasSize) / 12;
    const y = (row * canvasSize) / 12;
    const width = (numOfColumns * canvasSize) / 12;
    const height = (numOfRows * canvasSize) / 12;
    return {
      x,
      y,
      width,
      height
    };
  }

  #getGroupPadding(group, zone) {
    const paddingStep = 5

    const left = (zone.column == group.column)
      ? 2 * paddingStep
      : paddingStep
    const right = ((zone.column + zone.numOfColumns) == (group.column + group.numOfColumns))
      ? 2 * paddingStep
      : paddingStep
    const top = (zone.row == group.row)
      ? 2 * paddingStep
      : paddingStep
    const bottom = ((zone.row + zone.numOfRows) == (group.row + group.numOfRows))
      ? 2 * paddingStep
      : paddingStep

    return { left, top, right, bottom }
  }


}