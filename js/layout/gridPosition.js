class GridPosition extends GridVector{

    constructor(columnCode, rowCode){
        super(columnCode, rowCode)
    }    

    
    getColumn(level){
        return this._getColumns(level)
    }

    getRow(level){
        return this._getRows(level)
    }
}