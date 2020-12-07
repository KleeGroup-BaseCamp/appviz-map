import {View} from "./view"
import {projection} from "../app"
import {Layout, ViewParams, ItemNamePrefix, ItemTypeName} from "../types"
import {Layer, LayerBuilder, PxPosition, GridPosition, PxSize, GridSize, TextUtils, 
    Card, Item, ItemTypeDetail, Icons} from "../neon"
import {ModelRepository, GroupModel} from "../model"

export class TechGroupView implements View {

    private types: {[itemNamePrefix in ItemNamePrefix]: ItemTypeName} = {
        dt: "data",
        tk: "task"
    }
    private groupId: any

    /**
     * @param {Object} params 
     */
    constructor(params: ViewParams) {
        this.groupId = params.groupId;
    }

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const groupModel = modelRepository.getGroupModelById(this.groupId)
        return groupModel 
            ? [this.createGroupLayer(groupModel), ...this.createItemTypesLayers(groupModel)]
            : []
    }

    private createGroupLayer(groupModel: GroupModel): Layer{
        return new LayerBuilder()
            .addComponent(
                new Card(
                    TextUtils.firstCharUpperCase(groupModel.getTitle()),
                    {
                        id: groupModel.getId(), 
                        size: projection.getPxSize(), 
                    }
                )
            )
            .build()
    }

    private createItemTypesLayers(groupModel: GroupModel): Layer[] {
        
        const itemTypesLayerBuilder = new LayerBuilder()
        const itemsLayerBuilder = new LayerBuilder()
        
        
        const itemModels = groupModel.getItemModels()
        Object.keys(this.types).forEach((typePrefix, typeIndex) => {
            // Harcoded layout for 2 itemTypes (to change)
            const itemTypeLayout = {
                row : (2 + typeIndex * 5).toString(),
                column : "1",
                numOfRows : "4",
                numOfColumns : (projection.getGridColumns() - 2).toString()
            }

            const itemTypePxSize = projection.gridToPxSize(new GridSize(itemTypeLayout.numOfColumns, itemTypeLayout.numOfRows))
            const itemTypePxPosition = projection.gridToPxPosition(new GridPosition(itemTypeLayout.column, itemTypeLayout.row))
            const typeName = this.types[typePrefix as ItemNamePrefix]
            itemTypesLayerBuilder.addComponent(
                new ItemTypeDetail(
                    (TextUtils.firstCharUpperCase(typeName)) + "s " + Icons.getIcon(typeName),
                    {size: itemTypePxSize}
                ),
                itemTypePxPosition
            )
            const typeItemModels = itemModels.filter((itemModel) => itemModel.getType() === typeName)
            typeItemModels.forEach((itemModel, itemModelIndex) => {
                const {itemPxPosition, itemPxSize} = this.getItemPx(itemModelIndex, 4, itemTypePxSize, itemTypePxPosition)
                itemsLayerBuilder.addComponent(
                    new Item(
                        itemModel.getTitle(),
                        {
                            id: itemModel.getId(), 
                            size: itemPxSize
                        }
                    ), 
                    itemPxPosition
                )
            })
        })

        return [itemTypesLayerBuilder.build(), itemsLayerBuilder.build()]
        
    }


    private getItemPx(
        itemIndex: number, 
        itemsPerRow: number, 
        itemTypePxSize: PxSize, 
        itemTypePxPosition: PxPosition
        ): {itemPxPosition: PxPosition, itemPxSize: PxSize} {
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