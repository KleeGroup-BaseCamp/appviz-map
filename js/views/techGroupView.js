class TechGroupView  {

    #types = {
        dt: "data",
        tk: "task"
    }
    #groupId

    constructor(groupId) {
        this.#groupId = groupId;
    }

    provideLayers(modelRepository, layout) {
        const groupModel = modelRepository.getGroupModels().find(groupModel => 
            groupModel.getId() === this.#groupId
        )
        return [
            this.#createGroupLayer(groupModel),
            ...this.#createItemTypesLayers(groupModel)
        ]
    }

    #createGroupLayer(groupModel){
        return new LayerBuilder()
            .addElement(
                new Card(
                    groupModel.getId(), 
                    projection.getPxSize(), 
                    TextUtils.firstCharUpperCase(groupModel.getTitle())
                )
            )
            .build()
    }

    #createItemTypesLayers(groupModel) {
        
        const itemTypesLayerBuilder = new LayerBuilder()
        const itemsLayerBuilder = new LayerBuilder()
        
        
        const itemModels = groupModel.getItemModels()
        Object.keys(this.#types).forEach((typePrefix, typeIndex) => {
            // Harcoded layout for 2 itemTypes (to change)
            const itemTypeLayout = {
                row : (2 + typeIndex * 5).toString(),
                column : "1",
                numOfRows : "4",
                numOfColumns : (projection.getGridColumns() - 2).toString()
            }

            const itemTypePxSize = projection.gridToPxSize(new GridSize(itemTypeLayout.numOfColumns, itemTypeLayout.numOfRows))
            const itemTypePxPosition = projection.gridToPxPosition(new GridPosition(itemTypeLayout.column, itemTypeLayout.row))
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

        return [itemTypesLayerBuilder.build(), itemsLayerBuilder.build()]
        
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
}