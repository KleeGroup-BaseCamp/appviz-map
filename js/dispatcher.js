class Dispatcher{
    #types = {
        dt: "data",
        tk: "task"
    }
    #layout
    #projection

    constructor(layoutPath) {
        this.#layout = loadJSON(layoutPath)
        this.#projection = new Projection(canvasWidth, canvasHeight)
    }


    #getItemPx(itemIndex, itemsPerRow, itemTypePxSize, itemTypePxPosition) {
        const padding = 10

        const itemTypeX = itemTypePxPosition.getX()
        const itemTypeY = itemTypePxPosition.getY()
        const itemTypeWidth = itemTypePxSize.getWidth()
        const itemWidth = ((itemTypeWidth - padding) / itemsPerRow) - padding
        const itemHeight = 40
         
        return {
            itemPxPosition: new PxPosition(
                itemTypeX + padding + (itemIndex % itemsPerRow) * (itemWidth + padding), 
                itemTypeY + 80 + Math.floor(itemIndex / itemsPerRow) * (itemHeight + padding)
                ),
            itemPxSize: new PxSize(((itemTypeWidth - padding) / itemsPerRow) - padding, itemHeight)
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

    #getItemTypeFrequencies(itemsModels){
        const itemTypeFrequencies = {}
        for (const typePrefix in this.#types){
            itemTypeFrequencies[this.#types[typePrefix]] = 0
        }
        for(const itemModel of itemsModels){
            const itemModelType = itemModel.getType()
            if(Object.keys(itemTypeFrequencies).includes(itemModelType)){
                itemTypeFrequencies[itemModelType]++
            }
        }
        return itemTypeFrequencies
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
            .addElement(new Grid(
                0, 
                this.#projection.getGridWidth(), 
                this.#projection.getGridHeight(), 
                this.#projection.getGridRows(), 
                this.#projection.getGridColumns()))
            .build()
    }

    generateZoneViewMap(isTechView) {
        const zonesLayerBuilder = new LayerBuilder()
        const groupsLayerBuilder = new LayerBuilder()
        
        for(const zoneName in this.#layout.zones){
            const zoneLayout = this.#layout.zones[zoneName]
            const zonePxSize = this.#projection.getPxSize(new GridSize(zoneLayout.numOfColumns, zoneLayout.numOfRows))
            const zonePxPosition = this.#projection.getPxPosition(new GridPosition(zoneLayout.column, zoneLayout.row))
            zonesLayerBuilder.addElement(
                new TechZoneView(
                    zoneName,
                    zonePxSize.getWidth(),
                    zonePxSize.getHeight(),
                    TextUtils.firstCharUpperCase((isTechView ? "" : "Func ") + zoneName),
                    this.#getZoneColor(zoneName)
                ),
                zonePxPosition
            )
        }
        for(const groupName in this.#layout.groups){
            const groupModel = modelRepository.getGroupModels().find(groupModel => 
                groupModel.getTitle() === groupName
            )
            const groupLayout = this.#layout.groups[groupName]
            const padding = this.#getGroupPadding(groupLayout, this.#layout.zones[groupModel.getType()])
            const itemTypeFrequencies = this.#getItemTypeFrequencies(groupModel.getItemModels())
            const groupPxSize = this.#projection.getPxSize(new GridSize(groupLayout.numOfColumns, groupLayout.numOfRows))
            const groupPxPosition = this.#projection.getPxPosition(new GridPosition(groupLayout.column, groupLayout.row))
            groupsLayerBuilder.addElement(
                new Group(
                    groupModel.getId(),
                    groupPxSize.getWidth() - padding.right - padding.left,
                    groupPxSize.getHeight() - padding.top - padding.bottom,
                    TextUtils.firstCharUpperCase((isTechView ? "" : "Func ") + groupName),
                    itemTypeFrequencies,
                    this.#getZoneColor(groupModel.getType())
                ),
                groupPxPosition
            )
        }

        return new MapBuilder()
        .addLayer(this.#buildBackgroundLayer())
        .addLayer(zonesLayerBuilder.build())
        .addLayer(groupsLayerBuilder.build())
        .addLayer(this.#buildGridLayer())
        .build()
    }

    generateGroupViewMap(groupId, isTechView) {
        const groupModel = modelRepository.getGroupModels().find(groupModel => 
            groupModel.getId() === groupId
        )
        const itemTypesLayerBuilder = new LayerBuilder()
        const itemsLayerBuilder = new LayerBuilder()
        const groupLayer = new LayerBuilder()
            .addElement(
                new TechGroupView(
                    groupModel.getId(), 
                    this.#projection.getGridWidth(), 
                    this.#projection.getGridHeight(), 
                    TextUtils.firstCharUpperCase((isTechView ? "" : "Functional") + groupModel.getTitle())
                )
            )
            .build()
        
        const itemModels = groupModel.getItemModels()
        Object.keys(this.#types).forEach((typePrefix, typeIndex) => {
            // Harcoded layout for 2 itemTypes (to change)
            const itemTypeLayout = {
                row : (2 + typeIndex * 5).toString(),
                column : "1",
                numOfRows : "4",
                numOfColumns : (this.#projection.getGridColumns() - 2).toString()
            }

            const itemTypePxSize = this.#projection.getPxSize(new GridSize(itemTypeLayout.numOfColumns, itemTypeLayout.numOfRows))
            const itemTypePxPosition = this.#projection.getPxPosition(new GridPosition(itemTypeLayout.column, itemTypeLayout.row))
            itemTypesLayerBuilder.addElement(
                new ItemTypeDetail(
                    this.#types[typePrefix],
                    itemTypePxSize.getWidth(),
                    itemTypePxSize.getHeight(),
                    (TextUtils.firstCharUpperCase(this.#types[typePrefix])) + "s " + style.getIcon(typePrefix)
                ),
                itemTypePxPosition
            )
            const typeItemModels = itemModels.filter((itemModel) => itemModel.getType() === this.#types[typePrefix])
            typeItemModels.forEach((itemModel, itemModelIndex) => {
                const {itemPxPosition, itemPxSize} = this.#getItemPx(itemModelIndex, 4, itemTypePxSize, itemTypePxPosition)
                itemsLayerBuilder.addElement(
                    new Item(
                        itemModel.getId(), 
                        itemPxSize.getWidth(), 
                        itemPxSize.getHeight(), 
                        itemModel.getTitle()
                    ), 
                    itemPxPosition
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

    #generateHeaderMap(title){
        const headerLayer = new LayerBuilder()
            .addElement(new TechGroupView(title, this.#projection.getGridWidth(), this.#projection.getGridHeight(), title))
            .build()
            
        return new MapBuilder()
            .addLayer(this.#buildBackgroundLayer())
            .addLayer(headerLayer)
            .build()
    }

    generateHomeViewMap(){
        return this.#generateHeaderMap("Home View")
    }

    generateDemoViewMap(){
        return this.#generateHeaderMap("Demo View")
    }

}