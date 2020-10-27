export class PxPosition{
    private x: number
    private y: number

    /**
     * @constructor
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x: number, y: number){
        this.x = x
        this.y = y
    }

    /**
     * @return {number} x position
     */
    public getX(): number{
        return this.x
    }

    /**
     * @return {number} y position
     */
    public getY(): number{
        return this.y
    }
}