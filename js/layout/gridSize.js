class GridSize{
    #numOfColumns
    #numOfLines

    constructor(numOfColumns, numOfLines){
        this.#numOfColumns = numOfColumns
        this.#numOfLines = numOfLines
    }

    getNumOfColumns(){
        return this.#numOfColumns
    }

    getNumOfLines(){
        return this.#numOfLines
    }
}