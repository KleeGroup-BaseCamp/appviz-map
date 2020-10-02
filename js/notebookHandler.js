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
      return this.#generateGroupMap(domains, fake, group);
    }
  }

  #extractType(domains, sketchName) {
    const typePrefix = sketchName.slice(0, 2).toLowerCase();
    const domainName = this.notebook.sketches[sketchName].packageName.split(
      "."
    )[2];
    if (domains[domainName]) {
      if (domains[domainName][this.#types[typePrefix]])
        domains[domainName][this.#types[typePrefix]].push(sketchName);
      else domains[domainName][this.#types[typePrefix]] = [sketchName];
    } else domains[domainName] = {
      [this.#types[typePrefix]]: [sketchName]
    };
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
    const backgroundLayerBuilder = new LayerBuilder();
    const zonesLayerBuilder = new LayerBuilder();
    const groupsLayerBuilder = new LayerBuilder();
    const itemsLayerBuilder = new LayerBuilder();
    const gridLayerBuilder = new LayerBuilder();

    backgroundLayerBuilder.addElement(new Background());
    // gridLayerBuilder.addElement(new Grid(12, 12, styles.domainsView.grid));

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
          this.#firstCharUpperCase(zoneName),
        ),
        x,
        y
      );

      Object.keys(zone.groups).forEach((groupName) => {
        const paddingStep = 5
        let pt = paddingStep; // top
        let pl = paddingStep; // left
        let pb = paddingStep; // bottom
        let pr = paddingStep; // right
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
        if (zone.column == group.column) {
          pl += paddingStep
        }
        if ((zone.column + zone.numOfColumns) == (group.column + group.numOfColumns)) {
          pr += paddingStep
        }
        if (zone.row == group.row) {
          pt += paddingStep
        }
        if ((zone.row + zone.numOfRows) == (group.row + group.numOfRows)) {
          pb += paddingStep
        }
        const items = Object.keys(this.#types).map((typePrefix) => {
          return {
            prefix: typePrefix,
            frequency:
              domains[groupName][this.#types[typePrefix]]
                ? domains[groupName][this.#types[typePrefix]].length
                : 0
          }
        })
        groupsLayerBuilder.addElement(
          new Group(
            width - pr - pl,
            height - pt - pb,
            this.#firstCharUpperCase(groupName),
            zoneName,
            items
          ),
          x + pl,
          y + pt
        );
        const top = y + pt + 40; // TO DO : Use title textAscent to compute
        const bottom = y + height - pb - 10;
        // Object.keys(this.#types).forEach((typePrefix, index) => {
        //   itemsLayerBuilder.addElement(
        //     new ItemType(
        //       typePrefix,
        //       domains[groupName][this.#types[typePrefix]] ?
        //         domains[groupName][this.#types[typePrefix]].length :
        //         0,
        //       width - pl - pr
        //     ),
        //     x + pl,
        //     top +
        //     ((2 * index + 1) * (bottom - top)) /
        //     (2 * Object.keys(this.#types).length)
        //   );
        // });
      });
    });



    return new MapBuilder()
      .addLayer(backgroundLayerBuilder.build())
      .addLayer(zonesLayerBuilder.build())
      .addLayer(groupsLayerBuilder.build())
      // .addLayer(itemsLayerBuilder.build())
      // .addLayer(gridLayerBuilder.build())
      .build();
  }

  #generateGroupMap(domains, fake, groupName) {
    const backgroundLayerBuilder = new LayerBuilder();
    const groupLayerBuilder = new LayerBuilder();
    const itemTypesLayerBuilder = new LayerBuilder();
    const itemsLayerBuilder = new LayerBuilder();
    backgroundLayerBuilder.addElement(new Background());
    groupLayerBuilder.addElement(
      new GroupView(
        canvasSize,
        canvasSize,
        this.#firstCharUpperCase(groupName),
      ),
      0,
      0
    );
    Object.keys(this.#types).forEach((typePrefix, typeIndex) => {
      const px = 20;
      const py = 50

      const height = (canvasSize - 100) / Object.keys(this.#types).length - py;
      itemTypesLayerBuilder.addElement(
        new ItemTypeDetail(
          canvasSize - 2 * px,
          height,
          (this.#types[typePrefix] == "objects" ?
            "Data" :
            this.#firstCharUpperCase(this.#types[typePrefix])) +
          " " + getIcon (typePrefix),
          domains[groupName][this.#types[typePrefix]]
        ),
        px,
        100 + (height + py) * typeIndex
      );
      // if (items) {
      //   items.forEach((item, itemIndex) => {
      //     itemsLayerBuilder.addElement(
      //       new Rectangle(
      //         itemWidth,
      //         itemHeight,
      //         item.slice(2, item.length),
      //       ),
      //       x +
      //       (((itemWidth + padding) * itemIndex + padding) %
      //         (width - padding)),
      //       y +
      //       50 +
      //       Math.floor(itemIndex / itemsPerRow) * (itemHeight + padding)
      //     );
      //   });
      // }
    });
    return new MapBuilder()
      .addLayer(backgroundLayerBuilder.build())
      .addLayer(groupLayerBuilder.build())
      .addLayer(itemTypesLayerBuilder.build())
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

  #firstCharUpperCase(string) {
    return string[0].toUpperCase() + string.slice(1, string.length);
  }
}