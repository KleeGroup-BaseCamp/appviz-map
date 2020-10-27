import  GridVector  from "./gridVector";

export default class GridSize extends GridVector{

    constructor(columnCode: string, rowCode: string){
        super(columnCode, rowCode)
    }    
    
    public getColumns(level: number){
       return this._getColumns(level)
    }

    public getRows(level: number){
        return this._getRows(level)
    }
}