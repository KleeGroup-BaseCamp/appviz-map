import { AbstractRating } from "./abstractRating";
import { icons } from "../app"

export class StarRating extends AbstractRating{
    
    public renderRatingIcon(sideLength: number, value: number): void{
        const icon = icons.star
        const ratio = sideLength / max(icon.height, icon.width)
        icon.resize(icon.width * ratio, icon.height * ratio)
        if (value > 0){
            image(icon, 0, 0, sideLength * value, sideLength, 0, 0, sideLength * value, sideLength)
        }
    }
}