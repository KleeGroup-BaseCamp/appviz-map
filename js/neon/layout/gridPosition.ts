import {GridVector} from "."

export class GridPosition extends GridVector{

    constructor(columnCode: string, rowCode: string){
        super(columnCode, rowCode)
    }    

    public getColumn(level: number): number{
        return this._getColumns(level)
    }

    public getRow(level: number): number{
        return this._getRows(level)
    }
}