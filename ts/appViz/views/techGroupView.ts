import {Layout, ItemNamePrefix, ItemTypeName} from "../types"
import {Projection, View, ViewParams, Layer, LayerBuilder, GridPosition, PxSize, GridSize, TextUtils, Card} from "../../neon"
import {ModelRepository, GroupModel} from "../model"
import {Item, ItemTypeDetail, Icons} from "../components"
import * as p5 from "p5"

export class TechGroupView implements View {
    private types: {[itemNamePrefix in ItemNamePrefix]: ItemTypeName} = {
        dt: "data",
        tk: "task"
    }

    private projection : Projection = Projection.buildProjection ()
    private readonly modelRepository: ModelRepository
    private readonly layout: Layout
    private groupId: any


    constructor(modelRepository: ModelRepository, layout: Layout, params: ViewParams){
        this.modelRepository = modelRepository
        this.layout = layout
        this.groupId = params.groupId;
    }

    public provideLayers(): Layer[] {
        const groupModel = this.modelRepository.getGroupModelById(this.groupId)
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
                        size: this.projection.getPxSize(), 
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
                numOfColumns : (this.projection.getGridColumns() - 2).toString()
            }

            const itemTypePxSize = this.projection.gridToPxSize(new GridSize(itemTypeLayout.numOfColumns, itemTypeLayout.numOfRows))
            const itemTypePxPosition = this.projection.gridToPxPosition(new GridPosition(itemTypeLayout.column, itemTypeLayout.row))
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
        itemTypePxPosition: p5.Vector
        ): {itemPxPosition: p5.Vector, itemPxSize: PxSize} {
        const padding = 10

        const itemTypeX = itemTypePxPosition.x
        const itemTypeY = itemTypePxPosition.y
        const itemTypeWidth = itemTypePxSize.getWidth()
        const itemWidth = ((itemTypeWidth - padding) / itemsPerRow) - padding
        const itemHeight = 40
         
        return {
            itemPxPosition: createVector(
                itemTypeX + padding + (itemIndex % itemsPerRow) * (itemWidth + padding), 
                itemTypeY + 80 + Math.floor(itemIndex / itemsPerRow) * (itemHeight + padding)
                ),
            itemPxSize: new PxSize(((itemTypeWidth - padding) / itemsPerRow) - padding, itemHeight)
        }
    }
}