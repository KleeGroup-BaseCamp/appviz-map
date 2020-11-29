export class PxSize{
    private readonly width: number
    private readonly height: number

    /**
     * @constructor
     * 
     * @param {number} width
     * @param {number} height
     */
    constructor(width: number, height?: number){
        this.width = width
        this.height = height??width
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