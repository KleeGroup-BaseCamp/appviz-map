class Projection {
    #gridWidth
    #gridHeight
    #gridColumns
    #gridRows

    /**
     * @constructor
     * @param {number} gridWidth 
     * @param {number} gridHeight 
     * @param {number} [gridColumns=12]
     * @param {number} [gridRows=12] 
     */
    constructor(gridWidth, gridHeight, gridColumns = 12, gridRows = 12){
        this.#gridWidth = gridWidth
        this.#gridHeight = gridHeight
        this.#gridColumns = gridColumns
        this.#gridRows = gridRows
    }

    /**
     * @param {string} column
     * @param {string} row
     * @returns {PxPosition}
     */
    getPxPosition(column, row){
        let x = 0
        let y = 0
        let gridColumns = this.#gridColumns
        let gridRows = this.#gridRows
        const columns = column.split(":")
        const rows = row.split(":")
        for(let i = 0; i < columns.length; i++){ // columns.length == rows.length
            x += parseInt(columns[i]) * (this.#gridWidth / gridColumns)
            y += parseInt(rows[i]) * (this.#gridHeight / gridRows)
            gridColumns *= this.#gridColumns
            gridRows *= this.#gridRows
        }
        return new PxPosition(x, y)
    } 

    /**
     * @param {string} numOfColumns
     * @param {string} numOfRows
     * @returns {PxSize}
     */
    getPxSize(numOfColumns, numOfRows){
        let width = 0
        let height = 0
        let gridColumns = this.#gridColumns
        let gridRows = this.#gridRows
        const numsOfColumns = numOfColumns.split(":")
        const numsOfRows = numOfRows.split(":")
        for(let i = 0; i < numsOfColumns.length; i++){ // numsOfColumns.length == numsOfRows.length
            width += parseInt(numsOfColumns[i]) * (this.#gridWidth / gridColumns)
            height += parseInt(numsOfRows[i]) * (this.#gridHeight / gridRows)
            gridColumns *= this.#gridColumns
            gridRows *= this.#gridRows
        }
        return new PxSize(width, height)
    }

    /**
     * @param {PxPos} pxPos
     * @param {number} level
     * @returns {GridPosition}
     */
    getGridPosition(x, y, level){
        let columns = []
        let rows = []
        let gridColumns = this.#gridColumns
        let gridRows = this.#gridRows
        for(let i = 0; i < level; i++){
            const column = Math.floor(x / (this.#gridWidth / gridColumns))
            const row = Math.floor(y / (this.#gridHeight / gridRows))
            columns.push(column.toString())
            rows.push(row.toString())
            x -= column * (this.#gridWidth / gridColumns)
            y -= row * (this.#gridHeight / gridRows)
            gridColumns *= this.#gridColumns
            gridRows *= this.#gridRows
        }
        return new GridPosition(columns.join(":"), rows.join(":"))
    }

    /**
     * @param {number} width 
     * @param {number} height 
     * @param {number} level
     * @returns {GridSize}
     */
    getGridSize(width, height, level){
        let numsOfColumns = []
        let numsOfRows = []
        let gridColumns = this.#gridColumns
        let gridRows = this.#gridRows
        for(let i = 0; i < level; i++){ // columns.length == rows.length
            const numOfColumns = Math.floor(width / (this.#gridWidth / gridColumns))
            const numOfRows = Math.floor(height / (this.#gridHeight / gridRows))
            numsOfColumns.push(numOfColumns.toString())
            numsOfRows.push(numOfRows.toString())
            width -= numOfColumns * (this.#gridWidth / gridColumns)
            height -= numOfRows * (this.#gridHeight / gridRows)
            gridColumns *= this.#gridColumns
            gridRows *= this.#gridRows
        }
        return new GridSize(numsOfColumns.join(":"), numsOfRows.join(":"))
    }
}
