import  GridVector  from "./gridVector";

export default class GridSize extends GridVector{

    constructor(columnCode, rowCode){
        super(columnCode, rowCode)
    }    
    
    getColumns(level){
       return this._getColumns(level)
    }

    getRows(level){
        return this._getRows(level)
    }
}