import { VElement } from "../core";
import {PxSize} from "../layout";

export abstract class Rating extends VElement{
    protected readonly value: number

    constructor(id: any, pxSize: PxSize, value: number){
        super(id, pxSize, false)
        this.value = value
    }

    public render(){
        const margin = 10
        const sideLength = min(this.getPxSize().getHeight(), this.getPxSize().getWidth() / 5 - margin * 4)
        let value = this.value
        push()
        for(let i = 0; i < 5; i++){
            this.renderRatingIcon(sideLength, min(value, 1))
            value = max(value - 1, 0)
            translate(sideLength + margin, 0)
        }
        pop()
    }

    abstract renderRatingIcon(sideLength: number, value: number /* in [0, 1] */): void
    
}