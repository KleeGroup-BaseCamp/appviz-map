import {AbstractRating} from "./abstractRating"
import {style } from "../../app"

export class SquareRating extends AbstractRating{
    
    public renderIcon(size: number, active : boolean, ratio: number): void{
        if (active){
            fill(style.text.color.primary)
        }
        rect(0, 0, size * ratio, size)
    }
}