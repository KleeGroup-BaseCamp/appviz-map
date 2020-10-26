export default class PxSize{
    private width: number
    private height: number

    /**
     * @constructor
     * 
     * @param {number} width
     * @param {number} height
     */
    constructor(width: number, height: number){
        this.width = width
        this.height = height
    }

    /**
     * @return {number} width
     */
    public getWidth(): number{
        return this.width
    }

    /**
     * @return {number} height
     */
    public getHeight(): number{
        return this.height
    }
}