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
     * @param {GridPosition} gridPosition
     * @returns {PxPosition}
     */
    getPxPosition(gridPosition){
        let x = 0
        let y = 0
        let gridColumns = this.#gridColumns
        let gridRows = this.#gridRows
        const columns = gridPosition.getColumnCode().split(":")
        const rows = gridPosition.getRowCode().split(":")
        for(let i = 0; i < columns.length; i++){ // columns.length == rows.length
            x += Math.round(parseInt(columns[i]) * (this.#gridWidth / gridColumns))
            y += Math.round(parseInt(rows[i]) * (this.#gridHeight / gridRows))
            gridColumns *= this.#gridColumns
            gridRows *= this.#gridRows
        }
        return new PxPosition(x, y)
    } 

    /**
     * @param {GridSize} gridSize
     * @returns {PxSize}
     */
    getPxSize(gridSize){
        let width = 0
        let height = 0
        let gridColumns = this.#gridColumns
        let gridRows = this.#gridRows
        const numsOfColumns = gridSize.getNumOfColumnsCode().split(":")
        const numsOfRows = gridSize.getNumOfRowsCode().split(":")
        for(let i = 0; i < numsOfColumns.length; i++){ // numsOfColumns.length == numsOfRows.length
            width += Math.round(parseInt(numsOfColumns[i]) * (this.#gridWidth / gridColumns))
            height += Math.round(parseInt(numsOfRows[i]) * (this.#gridHeight / gridRows))
            gridColumns *= this.#gridColumns
            gridRows *= this.#gridRows
        }
        return new PxSize(width, height)
    }

    /**
     * @param {PxPosition} pxPos
     * @param {number} level
     * @returns {GridPosition}
     */
    getGridPosition(pxPos, level){
        let columns = []
        let rows = []
        let x = pxPos.getX()
        let y = pxPos.getY()
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
     * @param {PxSize} pxSize
     * @param {number} level
     * @returns {GridSize}
     */
    getGridSize(pxSize, level){
        let numsOfColumns = []
        let numsOfRows = []
        let width = pxSize.getWidth()
        let height = pxSize.getHeight()
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
