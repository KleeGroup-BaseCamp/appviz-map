import {VElement} from "../core";
import {PxSize} from "../layout";
import {AnimationUtils} from "../utils"

export abstract class AbstractRating extends VElement{
    //How many icons are displayed ?
    private readonly icons: number  = 5
    protected value: number

    constructor(id: any, pxSize: PxSize, value: number){
        super(id, pxSize, false)
        this.value = value
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, this.icons, duration, (s:number) => this.value = min(s,value) )
    }

    public render(){
        const margin = 3
        const sideLength = min(this.getPxSize().getHeight(), this.getPxSize().getWidth() / this.icons - margin)
        let v = this.value
        push()
        for(let i = 0; i < this.icons; i++){
            this.renderRatingIcon(sideLength, min(v, 1))
            v = max(v - 1, 0)
            translate(sideLength + margin, 0)
        }
        pop()
    }

    /**
     * 
     * @param sideLength Icon's square bounding box's side length
     * @param value Value displayed by icon (0 < value < 1)
     */
    abstract renderRatingIcon(sideLength: number, value: number): void
}