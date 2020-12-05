import {AbstractRating} from "./abstractRating"
import {style } from "../../../app"
import {VElementProps} from "../../core";

export interface SquareRatingProps extends VElementProps {}

export class SquareRating extends AbstractRating{
    
    constructor(rate : number, props : SquareRatingProps){
        super(rate, props)
    } 

    public renderIcon(size: number, active : boolean, ratio: number): void{
        if (active){
            fill(style.text.color.primary)
        }
        rect(0, 0, size * ratio, size)
    }
}