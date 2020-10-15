class Projection {
    #gridWidth
    #gridHeight
    #gridColumns
    #gridRows

    /**
     * @constructor
     * @param {number} gridWidth 
     * @param {number} gridHeight 
     * @param {number} gridColumns 
     * @param {number} gridRows 
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
     * @returns {{x: number, y: number}}
     */
    getPxPos(column, row){
        const x = parseInt(column) * (this.#gridWidth / this.#gridColumns)
        const y = parseInt(row) * (this.#gridHeight / this.#gridRows)
        return {x, y}
    } 

    /**
     * @param {string} numOfColumns 
     * @param {string} numOfRows 
     * @returns {{width: number, height: number}}
     */
    getPxSize(numOfColumns, numOfRows){
        const width = parseInt(numOfColumns) * (this.#gridWidth / this.#gridColumns)
        const height = parseInt(numOfRows) * (this.#gridHeight / this.#gridRows)
        return {width, height}
    }

    /**
     * @param {string} x 
     * @param {string} y
     * @returns {{column: number, row: number}}
     */
    getGridPos(x, y){
        const column = Math.round(parseInt(x) / (this.#gridWidth / this.#gridColumns)) 
        const row = Math.round(parseInt(y) / (this.#gridHeight / this.#gridRows))
        return {column, row}
    }

    /**
     * @param {string} width 
     * @param {string} height
     * @returns {{numOfColumns: number, numOfRows: number}}
     */
    getGridSize(width, height){
        const numOfColumns = Math.round(parseInt(width) / (this.#gridWidth / this.#gridColumns))
        const numOfRows = Math.round(parseInt(height) / (this.#gridHeight / this.#gridRows))
        return {numOfColumns, numOfRows}
    }
}
