import View from "./view"

import LayerBuilder from "../core/layerBuilder"

import TextUtils  from "../utils/textutils"

import Card from "./elements/card"
import Item from "./elements/item"
import ItemTypeDetail from "./elements/itemTypeDetail"

import PxPosition from "../layout/pxPosition"
import GridPosition from "../layout/gridPosition"
import PxSize from "../layout/pxSize"
import GridSize from "../layout/gridSize"

import ModelRepository from "../model/modelRepository"

import {Layout, ViewParams, ItemNamePrefix, ItemTypeName} from "../types/types"

import {style, projection} from "../sketch"
import GroupModel from "../model/groupModel"


export default class TechGroupView extends View {

    #types: {[itemNamePrefix in ItemNamePrefix]: ItemTypeName} = {
        dt: "data",
        tk: "task"
    }
    #groupId: any

    /**
     * @param {Object} params 
     */
    constructor(params: ViewParams) {
        super()
        this.#groupId = params.groupId;
    }

    provideLayers(modelRepository: ModelRepository, layout: Layout) {
        const groupModel = modelRepository.getGroupModelById(this.#groupId)
        return [
            this.createGroupLayer(groupModel),
            ...this.createItemTypesLayers(groupModel)
        ]
    }

    private createGroupLayer(groupModel: GroupModel){
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

    private createItemTypesLayers(groupModel: GroupModel) {
        
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
            const typeName = this.#types[typePrefix as ItemNamePrefix]
            itemTypesLayerBuilder.addElement(
                new ItemTypeDetail(
                    typeName,
                    itemTypePxSize,
                    (TextUtils.firstCharUpperCase(typeName)) + "s " + style.getIcon(typeName)
                ),
                itemTypePxPosition
            )
            const typeItemModels = itemModels.filter((itemModel) => itemModel.getType() === typeName)
            typeItemModels.forEach((itemModel, itemModelIndex) => {
                const {itemPxPosition, itemPxSize} = this.getItemPx(itemModelIndex, 4, itemTypePxSize, itemTypePxPosition)
                itemsLayerBuilder.addElement(
                    new Item(
                        itemModel.getId(), 
                        itemPxSize, 
                        itemModel.getTitle()
                    ), 
                    itemPxPosition
                )
            })
        })

        return [itemTypesLayerBuilder.build(), itemsLayerBuilder.build()]
        
    }


    getItemPx(itemIndex: number, itemsPerRow: number, itemTypePxSize: PxSize, itemTypePxPosition: PxPosition) {
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