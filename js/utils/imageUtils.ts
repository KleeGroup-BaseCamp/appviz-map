import {Image} from "p5"

export class ImageUtils {
    public static clone(img : Image) : Image {
    // Deep copy
    const imgCopy = createImage(img.width, img.height)
    imgCopy.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height) 
    return  imgCopy
    }
} 