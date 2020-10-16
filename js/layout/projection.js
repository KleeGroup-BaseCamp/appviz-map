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
     * @param {GridPos} gridPos
     * @returns {PxPos}
     */
    getPxPos(gridPos){
        let x = 0
        let y = 0
        let gridColumns = this.#gridColumns
        let gridRows = this.#gridRows
        const columns = gridPos.getColumn().split(":")
        const rows = gridPos.getRow().split(":")
        for(let i = 0; i < columns.length; i++){ // columns.length == rows.length
            x += parseInt(columns[i]) * (this.#gridWidth / gridColumns)
            y += parseInt(rows[i]) * (this.#gridHeight / gridRows)
            gridColumns *= this.#gridColumns
            gridRows *= this.#gridRows
        }
        return PxPos(x, y)
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
        const numsOfColumns = gridSize.getNumOfColumns().split(":")
        const numsOfRows = gridSize.getNumOfRows().split(":")
        for(let i = 0; i < numsOfColumns.length; i++){ // numsOfColumns.length == numsOfRows.length
            width += parseInt(numsOfColumns[i]) * (this.#gridWidth / gridColumns)
            height += parseInt(numsOfRows[i]) * (this.#gridHeight / gridRows)
            gridColumns *= this.#gridColumns
            gridRows *= this.#gridRows
        }
        return PxSize(width, height)
    }

    /**
     * @param {PxPos} pxPos
     * @param {number} level
     * @returns {GridPos}
     */
    getGridPos(pxPos, level){
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
        return GridPos(columns.join(":"), rows.join(":"))
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
        return GridSize(numsOfColumns.join(":"), numsOfRows.join(":"))
    }
}
