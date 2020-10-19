class GridPosition{
    /**
     * Array.<string>
     */
    #columns
    #rows
    #length

    constructor(columnCode, rowCode){
        this.#columns = columnCode.split(":").map (s=> Number(s))
        this.#rows = rowCode.split(":").map (s=> Number(s))
        //---
        if (this.#columns.length !== this.#rows.length){
            throw 'levels of columns and rows mus be equal'    
        }
        this.#length = this.#columns.length //= this.#rows.length
    }    

    getLength(){
        return this.#length
    }

    #checkLevel(level){
        if (level<0 || level >= this.#length) { 
            throw 'level must be between [0 ; '+this.#length +'['    
        }
    }
    
    getColumn(level){
        this.#checkLevel(level)
        return this.#columns[level]
    }

    getRow(level){
        this.#checkLevel(level)
        return this.#rows[level]
    }
}