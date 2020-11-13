import { AbstractRating } from "./abstractRating";
import { style } from "../app"

export class SquareRating extends AbstractRating{
    
    public renderRatingIcon(size: number, ratio: number): void{
        noStroke()
        fill(style.color.front)
        square(0, 0, size)
        fill(style.text.color.primary)
        rect(0, 0, size * ratio, size)
    }
}