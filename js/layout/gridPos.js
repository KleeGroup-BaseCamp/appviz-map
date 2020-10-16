class GridPos{
    #column
    #line

    constructor(column, line){
        this.#column = column
        this.#line = line
    }

    getColumn(){
        return this.#column
    }

    getLine(){
        return this.#line
    }
}