class NotebookHandler {
  #types = {
    dt: "objects",
    tk: "tasks"
  }
  #notebook
  #gridRows
  #gridColumns
  #gridWidth
  #gridHeight

  constructor(notebookPath) {
    this.#notebook = loadJSON(notebookPath)
    this.#gridRows = 12
    this.#gridColumns = 12
    this.#gridWidth = canvasWidth
    this.#gridHeight = canvasHeight 
  }

  #updateGridDimensions(){
    this.#gridWidth = canvasWidth
    this.#gridHeight = canvasHeight
  }

  handle(fake) {
    this.#updateGridDimensions()
    const domains = this.#extractDomains()
    if (view == "techZone") {
      return this.#generateZoneViewMap(domains, fake, true)
    } else if (view == "techGroup"){
      return this.#generateGroupViewMap(domains, groupId, true)
    } else if (view == "funcZone"){
      return this.#generateZoneViewMap(domains, fake, false)
    } else if (view == "funcGroup"){
      return this.#generateGroupViewMap(domains, groupId, false)
    } else if(view == "demo"){
        return this.#generateDemoViewMap()
    } else {
      return this.#generateHomeViewMap()
    }
  }

  #extractType(domains, sketchName) {
    const typePrefix = sketchName.slice(0, 2).toLowerCase()
    const domainName = this.#notebook.sketches[sketchName].packageName
      .split(".")[2]
    const type = this.#types[typePrefix]
    if (domains[domainName]) {
      if (domains[domainName][type]) {
        domains[domainName][type].push(sketchName)
      } else {
        domains[domainName][type] = [sketchName]
      }
    } else {
      domains[domainName] = { [type]: [sketchName] }
    }
  }

  #extractDomains() {
    const domains = {}
    Object.keys(this.#notebook.sketches).map((sketchName) => {
      for (const typePrefix in this.#types) {
        if (sketchName.slice(0, 2).toLowerCase() === typePrefix)
          this.#extractType(domains, sketchName)
      }
    })
    return domains
  }

  
  #generateZoneViewMap(domains, fake, isTechView) {
    const zonesLayerBuilder = new LayerBuilder()
    const groupsLayerBuilder = new LayerBuilder()

    Object.keys(fake.zones).forEach((zoneName) => {
      const zone = fake.zones[zoneName]
      const {
        x,
        y,
        width,
        height
      } = this.#getPixels(
        zone.column,
        zone.row,
        zone.numOfColumns,
        zone.numOfRows
      )
      zonesLayerBuilder.addElement(
        new TechZoneView(0,
          width,
          height,
          TextUtils.firstCharUpperCase((isTechView ? "" : "Func ") + zoneName) ,
          this.#buildColor(zoneName)
        ),
        x,
        y
      )

      Object.keys(zone.groups).forEach((groupName) => {
        const group = zone.groups[groupName]
        const {
          x,
          y,
          width,
          height
        } = this.#getPixels(
          group.column,
          group.row,
          group.numOfColumns,
          group.numOfRows
        )
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
            groupName,
            width - padding.right - padding.left,
            height - padding.top - padding.bottom,
            TextUtils.firstCharUpperCase(groupName),
            items,
            this.#buildColor(zoneName)),
          x + padding.left,
          y + padding.top
        )
      })
    })



    return new MapBuilder()
      .addLayer(this.#buildBackgroundLayer())
      .addLayer(zonesLayerBuilder.build())
      .addLayer(groupsLayerBuilder.build())
      .addLayer(this.#buildGridLayer())
      .build()
  }

  // #generateZoneViewMap(domains, fake, isTechView) {
  //   dispatcher.generateZoneViewMap(isTechView)
  // }

  #buildColor(zone){
    switch (zone) {
      case "pilotage":
          return style.color.b
      case "operationnel":
          return style.color.a
      case "referentiel":
          return style.color.c
      default:
          return style.color.undefined
      }
  }
  #generateGroupViewMap(domains, groupName, isTechView) {
    const itemTypesLayerBuilder = new LayerBuilder()
    const itemsLayerBuilder = new LayerBuilder()
    const groupLayer = new LayerBuilder()
      .addElement(new TechGroupView(groupName, this.#gridWidth, this.#gridHeight, TextUtils.firstCharUpperCase((isTechView ? "" : "Functional") + groupName )))
      .build()

    Object.keys(this.#types).forEach((typePrefix, typeIndex) => {
      const row = 2 + typeIndex * 5
      const column = 1
      const numOfRows = 4
      const numOfColumns = this.#gridColumns - column * 2
      const {
        x: itemTypeX,
        y: itemTypeY,
        width: itemTypeWidth,
        height: itemTypeHeight
      } = this.#getPixels(
        column.toString(),
        row.toString(),
        numOfColumns.toString(),
        numOfRows.toString(),
      )

      itemTypesLayerBuilder.addElement(
        new ItemTypeDetail(
          this.#types[typePrefix],
          itemTypeWidth,
          itemTypeHeight,
          (this.#types[typePrefix] == "objects" ?
            "Data" :
            TextUtils.firstCharUpperCase(this.#types[typePrefix])) +
          " " + style.getIcon(typePrefix)
        ),
        itemTypeX,
        itemTypeY
      )

      const items = domains[groupName][this.#types[typePrefix]] ?? []
      items.forEach((item, index) => {
        const {
          itemX,
          itemY,
          itemWidth,
          itemHeight
        } = this.#getItemPixels(
          index,
          4,
          column,
          row,
          numOfColumns,
          numOfRows,
        )
        itemsLayerBuilder.addElement(new Item(item, itemWidth, itemHeight, item.slice(2)), itemX, itemY)
      })
    })
    return new MapBuilder()
      .addLayer(this.#buildBackgroundLayer())
      .addLayer(groupLayer)
      .addLayer(itemTypesLayerBuilder.build())
      .addLayer(itemsLayerBuilder.build())
      .addLayer(this.#buildGridLayer())
      .build()
  }

  #buildBackgroundLayer() {
    return new LayerBuilder()
      .addElement(new Background())
      .build()
  }

  #buildGridLayer() {
    return new LayerBuilder()
      .addElement(new Grid(0, this.#gridWidth, this.#gridHeight, this.#gridRows, this.#gridColumns))
      .build()
  }

  #getPixels(columnCode, rowCode, numOfColumnsCode, numOfRowsCode) {
    let gridHeight = this.#gridHeight
    let gridWidth = this.#gridWidth
    let x = 0
    let y = 0
    const rows = rowCode.split(":")
    const columns = columnCode.split(":")
    const numsOfColumns = numOfColumnsCode.split(":")
    const numsOfRows = numOfRowsCode.split(":")
    // rows.length == columns.length == numOfColumns.length == numOfRows.length
    const depth = rows.length
    for (let i = 0; i < depth; i++) {
      const row = parseInt(rows[i])
      const column = parseInt(columns[i])
      const numOfColumns = parseInt(numsOfColumns[i])
      const numOfRows = parseInt(numsOfRows[i])
      x += (column * gridWidth) / this.#gridColumns
      y += (row * gridHeight) / this.#gridRows
      gridWidth = (numOfColumns * gridWidth) / this.#gridColumns
      gridHeight = (numOfRows * gridHeight) / this.#gridRows
    }
    // const width = gridWidth
    // const height = gridHeight
    return {
      x,
      y,
      width: gridWidth,
      height: gridHeight
    }
  }

  #getItemPixels(itemIndex, itemsPerRow, itemTypeColumn, itemTypeRow, itemTypeNumOfColumns, itemTypeNumOfRows) {
    const innerRow = Math.floor(itemIndex / itemsPerRow) * 2
    const innerColumn = (itemIndex % itemsPerRow) * (this.#gridColumns / itemsPerRow)
    const padding = 5

    const {
      x,
      y,
      width,
      height
    } = this.#getPixels(
      itemTypeColumn + ":" + innerColumn,
      (itemTypeRow + 1) + ":" + innerRow,
      itemTypeNumOfColumns + ":" + (this.#gridColumns / itemsPerRow),
      itemTypeNumOfRows + ":2"
    )
    return {
      itemX: x + padding,
      itemY: y + padding,
      itemWidth: width - 2 * padding,
      itemHeight: height - 2 * padding
    }
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


  #generateHeaderMap(title){
    const headerLayer = new LayerBuilder()
      .addElement(new TechGroupView(title, this.#gridWidth, this.#gridHeight, title))
      .build()
    
      return new MapBuilder()
      .addLayer(this.#buildBackgroundLayer())
      .addLayer(headerLayer)
      .build()
  }

  #generateDemoViewMap(){
    return this.#generateHeaderMap("Demo View")
  }

  #generateHomeViewMap(){
    return this.#generateHeaderMap("Home View")
  }


}