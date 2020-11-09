import {GridVector} from "../layout"

export class GridSize extends GridVector{

    constructor(columnCode: string, rowCode: string){
        super(columnCode, rowCode)
    }    
    
    public getColumns(level: number): number{
       return this._getColumns(level)
    }

    public getRows(level: number): number{
        return this._getRows(level)
    }
}