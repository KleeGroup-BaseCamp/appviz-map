class GridSize{
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
    
    getColumns(level){
        this.#checkLevel(level)
        return this.#columns[level]
    }

    getRows(level){
        this.#checkLevel(level)
        return this.#rows[level]
    }
}