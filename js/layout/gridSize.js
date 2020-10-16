class GridSize{
    #numOfColumnsCode
    #numOfRowsCode

    constructor(numOfColumnsCode, numOfRowsCode){
        this.#numOfColumnsCode = numOfColumnsCode
        this.#numOfRowsCode = numOfRowsCode
    }

    getNumOfColumnsCode(){
        return this.#numOfColumnsCode
    }

    getNumOfRowsCode(){
        return this.#numOfRowsCode
    }
}