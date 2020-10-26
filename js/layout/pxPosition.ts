export default class PxPosition{
    #x: number
    #y: number

    /**
     * @constructor
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x: number, y: number){
        this.#x = x
        this.#y = y
    }

    /**
     * @return {number} x position
     */
    getX(){
        return this.#x
    }

    /**
     * @return {number} y position
     */
    getY(){
        return this.#y
    }
}