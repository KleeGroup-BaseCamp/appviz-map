class LayoutUtils{
    #gridWidth
    #gridHeight

    constructor(gridWidth, gridHeight){
        this.#gridWidth = gridWidth
        this.#gridHeight = gridHeight
    }

    getPxPos(column, row){
        let x = 0
        let y = 0
        const rows = rowCode.split(":")
        const columns = columnCode.split(":")
        for (let i = 0; i < rows.length; i++) { //rows.length == columns.depth
            x += (parseInt(columns[i]) * this.#gridWidth) / this.#gridColumns
            y += (parseInt(rows[i]) * this.#gridHeight) / this.#gridRows
            this.#gridWidth = (numOfColumns * this.#gridWidth) / this.#gridColumns
            this.#gridHeight = (numOfRows * this.#gridHeight) / this.#gridRows
        }
        const width = this.#gridWidth
        const height = this.#gridHeight
        return {
        x,
        y,
        width,
        height
        }
    }

    getPxSize(numOfColumns, numOfRows){

    }

    getGridPos(x, y){

    }

    getGridSize(width, height){

    }
}
