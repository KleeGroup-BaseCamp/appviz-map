/**
 * View of a zone.
 */
import {neon, projection} from "../app"
import {View} from "./view"
import {Layout, ItemNamePrefix, ItemTypeName, ItemTypeFrequencies, ComponentLayout} from "../types"
import {Layer, LayerBuilder, PxPosition, GridPosition, PxSize, GridSize, TextUtils} from "../../neon"
import {ModelRepository, ItemModel} from "../model"
import {Zone, Group} from "../components"

export class TechZoneView implements View {

    private types: {[itemNamePrefix in ItemNamePrefix]: ItemTypeName} = {
        dt: "data",
        tk: "task"
    }

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        return [
            this.createZoneLayer(layout),
            this.createGroupLayer(modelRepository, layout)
        ]
    }

    private createZoneLayer(layout: Layout): Layer {
        const zonesLayerBuilder = new LayerBuilder()

        for (const zoneName in layout.zones) {
            const zoneLayout = layout.zones[zoneName]
            const zonePxSize = projection.gridToPxSize(new GridSize(zoneLayout.numOfColumns, zoneLayout.numOfRows))
            const zonePxPosition = projection.gridToPxPosition(new GridPosition(zoneLayout.column, zoneLayout.row))
            zonesLayerBuilder.addComponent(
                new Zone(
                    TextUtils.firstCharUpperCase(zoneName),
                    {
                        size: zonePxSize,
                        color: this.getZoneColor(zoneName)
                    }
                ),
                zonePxPosition
            )
        }

        return zonesLayerBuilder.build();
    }


    private createGroupLayer(modelRepository: ModelRepository, layout: Layout): Layer {
        const groupsLayerBuilder = new LayerBuilder()

        for (const groupName in layout.groups) {
            const groupModel = modelRepository.getGroupModels().find(groupModel => // TO DO: Use getGroupModelById instead
                groupModel.getTitle() === groupName
            ) 
            if (groupModel !== undefined){
                const groupLayout = layout.groups[groupName]
                const padding = this.getGroupPadding(groupLayout, layout.zones[groupModel.getType()])
                const itemTypeFrequencies = this.getItemTypeFrequencies(groupModel.getItemModels())
                const groupPxSize = projection.gridToPxSize(new GridSize(groupLayout.numOfColumns, groupLayout.numOfRows))
                const groupPxPosition = projection.gridToPxPosition(new GridPosition(groupLayout.column, groupLayout.row))
                const paddedGroupPxPosition = new PxPosition(groupPxPosition.getX() + padding.left, groupPxPosition.getY() + padding.top)
                groupsLayerBuilder.addComponent(
                    new Group(
                        TextUtils.firstCharUpperCase(groupName),
                        itemTypeFrequencies,
                        {
                            id: groupModel.getId(),
                            size: new PxSize (
                                groupPxSize.getWidth() - padding.right - padding.left,
                                groupPxSize.getHeight() - padding.top - padding.bottom
                            ),
                            color: this.getZoneColor(groupModel.getType())
                        }
                    ),
                    paddedGroupPxPosition
                )
            }
        }

        return groupsLayerBuilder.build();
    }

    private getGroupPadding(group: ComponentLayout, zone: ComponentLayout):{ // TO DO : Rename to groupLayout and zoneLayout ?
        left: number,
        top: number,
        right: number,
        bottom: number
    } { 
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

    private getItemTypeFrequencies(itemsModels: ItemModel[]){
        const itemTypeFrequencies: ItemTypeFrequencies = {}
        for (const typePrefix in this.types){
            itemTypeFrequencies[this.types[typePrefix as ItemNamePrefix]] = 0
        }
        for(const itemModel of itemsModels){
            const itemModelType = itemModel.getType()
            if(Object.keys(itemTypeFrequencies).includes(itemModelType)){
                (itemTypeFrequencies[itemModelType as ItemTypeName] as number)++
            }
        }
        return itemTypeFrequencies
    }

    private getZoneColor(zone: string){
        switch (zone) {
            case "pilotage":
                return neon.getStyle().color.b
            case "operationnel":
                return neon.getStyle().color.a
            case "referentiel":
                return neon.getStyle().color.c
            default:
                return neon.getStyle().color.undefined
        }
    }

}