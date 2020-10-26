export default class GridVector {
     /**
     * Array.<string>
     */
    #columns: number[]
    #rows: number[]
    #length: number

    constructor(columnCode: string, rowCode: string){
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

    private checkLevel(level: number){
        if (level<0 || level >= this.#length) { 
            throw 'level must be between [0 ; '+this.#length +'['    
        }
    }
    
    _getColumns(level: number){
        this.checkLevel(level)
        return this.#columns[level]
    }

    _getRows(level: number){
        this.checkLevel(level)
        return this.#rows[level]
    }
}