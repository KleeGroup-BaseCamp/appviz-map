export default class PxSize{
    #width: number
    #height: number

    /**
     * @constructor
     * 
     * @param {number} width
     * @param {number} height
     */
    constructor(width: number, height: number){
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