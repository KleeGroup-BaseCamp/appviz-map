export type ItemTypeName = "data" | "task"
export type ItemNamePrefix = "dt" | "tk"

export type ItemTypeFrequencies = {[itemTypeName in ItemTypeName]?: number}

export type Layout = {
    zones: {[zoneName: string]: ComponentLayout},
    groups: {[groupName: string]: ComponentLayout}
}

export type ViewParams = {groupId: any} // Will change later


export type ComponentLayout = { // Better name ("Component" can be confusing)
    column: string, 
    row: string, 
    numOfColumns: string, 
    numOfRows: string
}


