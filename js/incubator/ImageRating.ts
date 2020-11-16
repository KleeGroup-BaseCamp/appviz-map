import { AbstractRating } from "./abstractRating";
import { Image } from "p5";

export class ImageRating extends AbstractRating{
    private img? : Image

    withImage(img : Image) : ImageRating{
        this.img = img
        return this
    }
    
    public renderIcon(size: number, active: boolean, ratio: number): void{
        if (!this.img) {
            throw 'you must define an image'
        }
        const imgRatio = size / max(this.img.height, this.img.width)
        this.img.resize(this.img.width * imgRatio, this.img.height * imgRatio)
        if (active){
            image(this.img, 0, 0, size * ratio, size, 0, 0, size * ratio, size)
        }
    }    
}