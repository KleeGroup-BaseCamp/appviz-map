class GridPosition{
    #columnCode
    #rowCode

    constructor(columnCode, rowCode){
        this.#columnCode = columnCode
        this.#rowCode = rowCode
    }

    getColumnCode(){
        return this.#columnCode
    }

    getRowCode(){
        return this.#rowCode
    }
}