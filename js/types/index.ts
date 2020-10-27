import {VElement} from "../core/index";
import {PxPosition} from "../layout/index";

export type PositionedElement = {pxPosition: PxPosition, element: VElement}

export type ItemTypeName = "data" | "task"
export type ItemNamePrefix = "dt" | "tk"

export type ItemTypeFrequencies = {[itemTypeName in ItemTypeName]?: number}

export type ElementLayout = { // Better name ("Element" can be confusing)
    column: string, 
    row: string, 
    numOfColumns: string, 
    numOfRows: string
}
export type Layout = {
    zones: {[zoneName: string]: ElementLayout},
    groups: {[groupName: string]: ElementLayout}
}

export type ViewParams = {groupId: any} // Will change later
