class PxPosition{
    #x
    #y

    /**
     * @constructor
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y){
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