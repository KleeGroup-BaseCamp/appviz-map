/**
 * View of a zone.
 */
class TechZoneView {

    #types = {
        dt: "data",
        tk: "task"
    }

    provideLayers(modelRepository, layout) {
        return [
            this.#createZoneLayer(layout),
            this.#createGroupLayer(modelRepository, layout)
        ]
    }

    #createZoneLayer(layout) {
        const zonesLayerBuilder = new LayerBuilder()

        for (const zoneName in layout.zones) {
            const zoneLayout = layout.zones[zoneName]
            const zonePxSize = projection.gridToPxSize(new GridSize(zoneLayout.numOfColumns, zoneLayout.numOfRows))
            const zonePxPosition = projection.gridToPxPosition(new GridPosition(zoneLayout.column, zoneLayout.row))
            zonesLayerBuilder.addElement(
                new Zone(
                    zoneName,
                    zonePxSize.getWidth(),
                    zonePxSize.getHeight(),
                    TextUtils.firstCharUpperCase(zoneName),
                    this.#getZoneColor(zoneName)
                ),
                zonePxPosition
            )
        }

        return zonesLayerBuilder.build();
    }


    #createGroupLayer(modelRepository, layout) {
        const groupsLayerBuilder = new LayerBuilder()

        for (const groupName in layout.groups) {
            const groupModel = modelRepository.getGroupModels().find(groupModel =>
                groupModel.getTitle() === groupName
            )
            const groupLayout = layout.groups[groupName]
            const padding = this.#getGroupPadding(groupLayout, layout.zones[groupModel.getType()])
            const itemTypeFrequencies = this.#getItemTypeFrequencies(groupModel.getItemModels())
            const groupPxSize = projection.gridToPxSize(new GridSize(groupLayout.numOfColumns, groupLayout.numOfRows))
            const groupPxPosition = projection.gridToPxPosition(new GridPosition(groupLayout.column, groupLayout.row))
            groupsLayerBuilder.addElement(
                new Group(
                    groupModel.getId(),
                    groupPxSize.getWidth() - padding.right - padding.left,
                    groupPxSize.getHeight() - padding.top - padding.bottom,
                    TextUtils.firstCharUpperCase(groupName),
                    itemTypeFrequencies,
                    this.#getZoneColor(groupModel.getType())
                ),
                groupPxPosition
            )
        }

        return groupsLayerBuilder.build();
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

}