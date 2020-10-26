import  GridVector from "./gridVector";
export default class GridPosition extends GridVector{

    constructor(columnCode: string, rowCode: string){
        super(columnCode, rowCode)
    }    

    
    getColumn(level: number): number{
        return this._getColumns(level)
    }

    getRow(level: number): number{
        return this._getRows(level)
    }
}