class PxSize{
    #width
    #height

    /**
     * @constructor
     * 
     * @param {number} width
     * @param {number} height
     */
    constructor(width, height){
        this.#width = width
        this.#height = height
    }

    /**
     * @return {number} width
     */
    getWidth(){
        return this.#width
    }

    /**
     * @return {number} height
     */
    getHeight(){
        return this.#height
    }
}
