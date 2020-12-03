export class GridVector {
    private readonly columns: number[]
    private readonly rows: number[]
    private readonly length: number

    constructor(columnCode: string, rowCode: string){
        this.columns = columnCode.split(":").map (s=> Number(s))
        this.rows = rowCode.split(":").map (s=> Number(s))
        //---
        if (this.columns.length !== this.rows.length){
            throw 'levels of columns and rows mus be equal'    
        }
        this.length = this.columns.length //= this.#rows.length
    }    

    getLength(): number{
        return this.length
    }

    private checkLevel(level: number): void{
        if (level<0 || level >= this.length) { 
            throw 'level must be between [0 ; '+this.length +'['    
        }
    }
    
    protected _getColumns(level: number): number{
        this.checkLevel(level)
        return this.columns[level]
    }

    protected _getRows(level: number): number{
        this.checkLevel(level)
        return this.rows[level]
    }
}