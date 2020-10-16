class GridSize{
    #numOfColumns
    #numOfRows

    constructor(numOfColumns, numOfRows){
        this.#numOfColumns = numOfColumns
        this.#numOfRows = numOfRows
    }

    getNumOfColumns(){
        return this.#numOfColumns
    }

    getNumOfRows(){
        return this.#numOfRows
    }
}