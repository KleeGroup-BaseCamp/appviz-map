class Projection {
    #pxSize
    #gridColumns
    #gridRows

    /**
     * @constructor
     * @param {pxSize} pxSize 
     * @param {number} [gridColumns=12]
     * @param {number} [gridRows=12] 
     */
    constructor(pxSize, gridColumns = 12, gridRows = 12){
        this.#pxSize = pxSize
        this.#gridColumns = gridColumns
        this.#gridRows = gridRows
    }

    /**
     * @param {GridPosition} gridPosition
     * @returns {PxPosition}
     */
    gridToPxPosition(gridPosition){
        let x = 0
        let y = 0
        let gridColumns = this.#gridColumns
        let gridRows = this.#gridRows
        const scaleX = this.#pxSize.getWidth() / gridColumns
        const scaleY = this.#pxSize.getHeight() / gridRows
        
        for(let i = 0; i < gridPosition.getLength(); i++){
            x += Math.round(gridPosition.getColumn(i) * scaleX)
            y += Math.round(gridPosition.getRow(i)* scaleY)
            gridColumns *= this.#gridColumns
            gridRows *= this.#gridRows
        }
        return new PxPosition(x, y)
    } 

    /**
     * @param {GridSize} gridSize
     * @returns {PxSize}
     */
    gridToPxSize(gridSize){
        let width = 0
        let height = 0
        let gridColumns = this.#gridColumns
        let gridRows = this.#gridRows
        const scaleX = this.#pxSize.getWidth() / gridColumns
        const scaleY = this.#pxSize.getHeight() / gridRows

        for(let i = 0; i < gridSize.getLength(); i++){
            width += Math.round(gridSize.getColumns(i) * scaleX)
            height += Math.round(gridSize.getRows(i) * scaleY)
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
    pxToGridPosition(pxPos, level){
        let columns = []
        let rows = []
        let x = pxPos.getX()
        let y = pxPos.getY()
        let gridColumns = this.#gridColumns
        let gridRows = this.#gridRows
        for(let i = 0; i < level; i++){
            const column = Math.floor(x / (this.#pxSize.getWidth() / gridColumns))
            const row = Math.floor(y / (this.#pxSize.getHeight() / gridRows))
            columns.push(column.toString())
            rows.push(row.toString())
            x -= column * (this.#pxSize.getWidth() / gridColumns)
            y -= row * (this.#pxSize.getHeight() / gridRows)
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
    pxToGridSize(pxSize, level){
        let numsOfColumns = []
        let numsOfRows = []
        let width = pxSize.getWidth()
        let height = pxSize.getHeight()
        let gridColumns = this.#gridColumns
        let gridRows = this.#gridRows
        for(let i = 0; i < level; i++){ // columns.length == rows.length
            const numOfColumns = Math.floor(width / (this.#pxSize.getWidth() / gridColumns))
            const numOfRows = Math.floor(height / (this.#pxSize.getHeight() / gridRows))
            numsOfColumns.push(numOfColumns.toString())
            numsOfRows.push(numOfRows.toString())
            width -= numOfColumns * (this.#pxSize.getWidth() / gridColumns)
            height -= numOfRows * (this.#pxSize.getHeight() / gridRows)
            gridColumns *= this.#gridColumns
            gridRows *= this.#gridRows
        }
        return new GridSize(numsOfColumns.join(":"), numsOfRows.join(":"))
    }

    getPxSize(){
        return this.#pxSize
    }

    getGridColumns(){
        return this.#gridColumns
    }

    getGridRows(){
        return this.#gridRows
    }
}
