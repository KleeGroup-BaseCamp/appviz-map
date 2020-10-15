class Projection {

    #gridWidth
    #gridHeight
    #gridColumns
    #gridRows

    constructor(gridWidth, gridHeight, gridColumns = 12, gridRows = 12){
        this.#gridWidth = gridWidth
        this.#gridHeight = gridHeight
        this.#gridColumns = gridColumns
        this.#gridRows = gridRows
    }

    getPxPos(column, row){
        const x = parseInt(column) * (this.#gridWidth / this.#gridColumns)
        const y = parseInt(row) * (this.#gridHeight / this.#gridRows)
        return {x, y}
    } 

    getPxSize(numOfColumns, numOfRows){
        const width = parseInt(numOfColumns) * (this.#gridWidth / this.#gridColumns)
        const height = parseInt(numOfRows) * (this.#gridHeight / this.#gridRows)
        return {width, height}
    }

    getGridPos(x, y){
        const column = Math.round(parseInt(x) / (this.#gridWidth / this.#gridColumns)) 
        const row = Math.round(parseInt(y) / (this.#gridHeight / this.#gridRows))
        return {column, row}
    }

    getGridSize(width, height){
        const numOfColumns = Math.round(parseInt(width) / (this.#gridWidth / this.#gridColumns))
        const numOfRows = Math.round(parseInt(height) / (this.#gridHeight / this.#gridRows))
        return {numOfColumns, numOfRows}
    }
}
