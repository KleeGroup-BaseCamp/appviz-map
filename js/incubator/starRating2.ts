import {AbstractRating} from "./abstractRating"

export class StarRating2 extends AbstractRating{
    
    public renderRatingIcon(size: number, value: number): void{
        noStroke()
        fill('gold')
        const numOfCorners = 5
        const angle = TWO_PI / numOfCorners
        const offset = - PI / 2
        const externalRadius = size / 2
        const internalRadius  = externalRadius / (5/2)

        beginShape()
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = cos(offset + a) * externalRadius
            let sy = sin(offset + a) * externalRadius
            vertex(sx, sy)
            sx = cos(offset + a + angle / 2) * internalRadius
            sy = sin(offset + a + angle / 2) * internalRadius
            vertex(sx, sy)
        }
        endShape(CLOSE)
    }
}