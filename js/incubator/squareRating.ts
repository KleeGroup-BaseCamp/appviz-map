import { Rating } from "./rating";
import { style } from "../app"

export class SquareRating extends Rating{
    
    public renderRatingIcon(sideLength: number, value: number): void{
        noStroke()
        fill(style.color.front)
        square(0, 0, sideLength)
        fill(style.text.color.primary)
        rect(0, 0, sideLength * value, sideLength)
    }
}