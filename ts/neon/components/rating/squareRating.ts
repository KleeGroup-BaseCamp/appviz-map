import {AbstractRating} from "./abstractRating"
import {ComponentProps} from "../../core";

export interface SquareRatingProps extends ComponentProps {}

export class SquareRating extends AbstractRating{
    
    constructor(rate : number, props : SquareRatingProps){
        super(rate, props)
    } 

    public renderIcon(size: number, active : boolean, ratio: number): void{
        if (active){
            fill(this.style.text.color.primary)
        }
        rect(0, 0, size * ratio, size)
    }
}