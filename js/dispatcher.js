class Dispatcher{
    #types = {
        dt: "data",
        tk: "task"
    }
    #layout
    #gridRows
    #gridColumns
    #gridWidth
    #gridHeight

    constructor(layoutPath) {
        this.#layout = loadJSON(layoutPath)
        this.#gridRows = 12
        this.#gridColumns = 12
        this.#gridWidth = canvasWidth
        this.#gridHeight = canvasHeight 
    }

    #updateGridDimensions(){
        this.#gridWidth = canvasWidth
        this.#gridHeight = canvasHeight
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
        const depth = rows.length // rows.length == columns.length == numOfColumns.length == numOfRows.length
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
        const width = gridWidth
        const height = gridHeight
        return {
        x,
        y,
        width,
        height
        }
    }

    #getPixelLayout(){
        const pixelLayout = {zones: {}, groups: {}}

        for(const zoneName in this.#layout.zones){
            const zone = this.#layout.zones[zoneName]
            pixelLayout.zones[zoneName] = this.#getPixels(
                zone.column,
                zone.row,
                zone.numOfColumns,
                zone.numOfRows
            )
        }
        for (const groupName in this.#layout.groups){
            const group = this.#layout.groups[groupName]
            pixelLayout.groups[groupName] = this.#getPixels(
                group.column,
                group.row,
                group.numOfColumns,
                group.numOfRows
            )
        }
        return pixelLayout
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

    #getItemsTypesFrequencies(itemsModels){
        const itemsTypesFrequencies = {}
        for (const typePrefix in this.#types){
            itemsTypesFrequencies[this.#types[typePrefix]] = 0
        }
        for(const itemModel of itemsModels){
            const itemModelType = itemModel.getType()
            if(Object.keys(itemsTypesFrequencies).includes(itemModelType)){
                itemsTypesFrequencies[itemModelType]++
            }
        }
        return itemsTypesFrequencies
    }

    #getZoneColor(zone){
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

    #generateZoneViewMap(isTechView) {
        const pixelLayout = this.#getPixelLayout()
        const zonesLayerBuilder = new LayerBuilder()
        const groupsLayerBuilder = new LayerBuilder()

        for(const zoneName in pixelLayout.zones){
            const zone = pixelLayout.zones[zoneName]
            zonesLayerBuilder.addElement(
                new TechZoneView(
                    zoneName,
                    zone.width,
                    zone.height,
                    TextUtils.firstCharUpperCase((isTechView ? "" : "Func ") + zoneName),
                    this.#getZoneColor(zoneName)
                ),
                zone.x,
                zone.y
            )
        }
        for(const groupName in pixelLayout.groups){
            const groupModel = modelRepository.getGroupsModels().find(groupModel => 
                groupModel.getTitle() === groupName
            )
            const group = pixelLayout.groups[groupName]
            const zone = pixelLayout.zones[groupModel.getType()]
            const padding = this.#getGroupPadding(group, zone)
            const itemsTypesFrequencies = this.#getItemsTypesFrequencies(groupModel.getItemsModels())
            groupsLayerBuilder.addElement(
                new Group(
                    groupName,
                    group.width - padding.right - padding.left,
                    group.height - padding.top - padding.bottom,
                    TextUtils.firstCharUpperCase((isTechView ? "" : "Func ") + groupName),
                    itemsTypesFrequencies,
                    this.#getZoneColor(groupModel.getType())
                ),
                group.x + padding.left,
                group.y + padding.top
            )
        }

        return new MapBuilder()
        .addLayer(this.#buildBackgroundLayer())
        .addLayer(zonesLayerBuilder.build())
        .addLayer(groupsLayerBuilder.build())
        .addLayer(this.#buildGridLayer())
        .build()
    }
}