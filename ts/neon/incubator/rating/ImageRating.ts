import {AbstractRating} from "./abstractRating"
import * as p5 from "p5"
import {ImageUtils} from "../../utils"
import {VElementProps} from "../../core";

export interface ImageRatingProps extends VElementProps {
    img : p5.Image
}

export class ImageRating extends AbstractRating{
    private readonly img : p5.Image

    constructor(rate : number, props :ImageRatingProps){
        super(rate, props)
        this.img = ImageUtils.clone(props.img)
    }
        
    public renderIcon(size: number, active: boolean, ratio: number): void{
        const imgRatio = size / max(this.img.height, this.img.width)
        this.img.resize(this.img.width * imgRatio, this.img.height * imgRatio)
        if (active){
            image(this.img, 0, 0, size * ratio, size, 0, 0, size * ratio, size)
        }
    }    
}