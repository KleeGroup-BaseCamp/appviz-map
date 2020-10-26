import  GridVector  from "./gridVector";

export default class GridSize extends GridVector{

    constructor(columnCode: string, rowCode: string){
        super(columnCode, rowCode)
    }    
    
    getColumns(level: number){
       return this._getColumns(level)
    }

    getRows(level: number){
        return this._getRows(level)
    }
}