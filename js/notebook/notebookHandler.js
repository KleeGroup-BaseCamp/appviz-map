class NotebookHandler {
  #types = {
    dt: "objects",
    tk: "tasks"
  };

  constructor(notebookPath) {
    this.notebook = loadJSON(notebookPath);
  }

  handle(fake) {
    idCount = 0
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
    const itemsLayerBuilder = new LayerBuilder();
    const groupLayer = new LayerBuilder()
      .addElement(new GroupView(canvasSize, canvasSize, Utils.firstCharUpperCase(groupName)))
      .build();

    Object.keys(this.#types).forEach((typePrefix, typeIndex) => {
      const row = 2 + typeIndex * 5

      const {
        x: itemTypeX,
        y: itemTypeY,
        width: itemTypeWidth,
        height: itemTypeHeight
      } = this.#getPixels(row.toString(), "1", "4", "10")
      // const itemTypePadding = { x: 20, y: 50 }

      // const height = (canvasSize - 100) / Object.keys(this.#types).length - padding.y;
      const items = domains[groupName][this.#types[typePrefix]] ?? []
      items.forEach((item, index) => {
        const { itemX, itemY, itemWidth, itemHeight } = this.#getItemPixels(index, row, 6)
        itemsLayerBuilder.addElement(new TextBox(itemWidth, itemHeight, item.slice(2)), itemX, itemY)
      })
      itemTypesLayerBuilder.addElement(
        new ItemTypeDetail(
          itemTypeWidth,
          itemTypeHeight,
          (this.#types[typePrefix] == "objects" ?
            "Data" :
            Utils.firstCharUpperCase(this.#types[typePrefix])) +
          " " + getIcon(typePrefix)
        ),
        itemTypeX,
        itemTypeY
      );
    });
    return new MapBuilder()
      .addLayer(this.#buildBackgroundLayer())
      .addLayer(groupLayer)
      .addLayer(itemTypesLayerBuilder.build())
      .addLayer(itemsLayerBuilder.build())
      .addLayer(this.#buildGridLayer())
      .build();
  }

  #getItemPixels(itemIndex, itemTypeRow, itemsPerRow) {
    const innerRow = Math.floor(itemIndex / itemsPerRow) * 2
    const innerColumn = (itemIndex % itemsPerRow) * (12 / itemsPerRow)
    const padding = 5

    const {
      x,
      y,
      width,
      height
    } = this.#getPixels((itemTypeRow + 1).toString() + ":" + innerRow, "1:" + innerColumn, "4:2", "10:" + (12 / itemsPerRow))
    return {
      itemX: x + padding,
      itemY: y + padding,
      itemWidth: width - 2 * padding,
      itemHeight: height - 2 * padding
    }
  }

  #getPixels(rowCode, columnCode, numOfRowsCode, numOfColumnsCode) {
    let gridHeight = canvasSize
    let gridWidth = canvasSize
    let x = 0
    let y = 0
    const rows = rowCode.split(":")
    const columns = columnCode.split(":")
    const numsOfColumns = numOfColumnsCode.split(":")
    const numsOfRows = numOfRowsCode.split(":")
    // rows.length = columns.length = numOfColumns.length = numOfRows.length
    const depth = rows.length
    for (let i = 0; i < depth; i++) {
      const row = parseInt(rows[i])
      const column = parseInt(columns[i])
      const numOfColumns = parseInt(numsOfColumns[i])
      const numOfRows = parseInt(numsOfRows[i])
      x += (column * gridWidth) / 12
      y += (row * gridHeight) / 12
      gridWidth = (numOfColumns * gridWidth) / 12
      gridHeight = (numOfRows * gridHeight) / 12
    }
    const width = gridWidth
    const height = gridHeight
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