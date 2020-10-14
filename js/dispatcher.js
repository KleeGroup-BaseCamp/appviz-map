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

    #getItemTypeLayout(typeIndex){
        return {
            row : 2 + typeIndex * 5,
            column : 1,
            numOfRows : 4,
            numOfColumns : this.#gridColumns - column * 2
        }
    }

    #getItemTypePixels(typeIndex){
        const {row, column, numOfRows, numOfColumns} = this.#getItemTypeLayout(typeIndex)
        const {x, y, width, height} = this.#getPixels(
            column.toString(),
            row.toString(),
            numOfColumns.toString(),
            numOfRows.toString()
        )
        return {
            itemTypeX: x,
            itemTypeY: y,
            itemTypeWidth: width,
            itemTypeHeight: height
        }
    }

    #getItemPixels(itemIndex, itemsPerRow, typeIndex) {
        const {
            row: itemTypeRow, 
            column: itemTypeColumn, 
            numOfRows: itemTypeNumOfRows, 
            numOfColumns: itemTypeNumOfColumns
        } = this.#getItemTypeLayout(typeIndex)
        
        const innerRow = Math.floor(itemIndex / itemsPerRow) * 2
        const innerColumn = (itemIndex % itemsPerRow) * (this.#gridColumns / itemsPerRow)
        const padding = 5

        const {x, y, width, height} = this.#getPixels(
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
                    groupModel.getId(),
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

    #generateGroupViewMap(groupId, isTechView) {
        const groupModel = modelRepository.getGroupsModels().find(groupModel => 
            groupModel.getId() === groupId
        )
        const itemTypesLayerBuilder = new LayerBuilder()
        const itemsLayerBuilder = new LayerBuilder()
        const groupLayer = new LayerBuilder()
            .addElement(
                new TechGroupView(
                    groupModel.getId(), 
                    this.#gridWidth, 
                    this.#gridHeight, 
                    TextUtils.firstCharUpperCase((isTechView ? "" : "Functional") + groupModel.getTitle())
                )
            )
            .build()
        
        const itemModels = groupModel.getItemsModels()
        Object.keys(this.#types).forEach((typePrefix, typeIndex) => {
            const {itemTypeX, itemTypeY, itemTypeWidth, itemTypeHeight} = this.#getItemTypePixels(typeIndex)
             itemTypesLayerBuilder.addElement(
                new ItemTypeDetail(
                    this.#types[typePrefix],
                    itemTypeWidth,
                    itemTypeHeight,
                    (TextUtils.firstCharUpperCase(this.#types[typePrefix])) + "s " + style.getIcon(typePrefix)
                ),
                itemTypeX,
                itemTypeY
            )
            const typeItemsModels = itemModels.filter((itemModel) => itemModel.getType() === this.#types[typePrefix])
            typeItemsModels.forEach((itemModel, itemModelIndex) => {
                const {itemX, itemY, itemWidth, itemHeight } = this.#getItemPixels(itemModelIndex, 4, typeIndex)
                itemsLayerBuilder.addElement(
                    new Item(
                        itemModel.getId(), 
                        itemWidth, 
                        itemHeight, 
                        item.getTitle()
                    ), 
                    itemX, 
                    itemY
                )
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
}