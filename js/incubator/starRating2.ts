import {AbstractRating} from "./abstractRating"

export class StarRating2 extends AbstractRating{
    
    public renderRatingIcon(size: number, value: number): void{
        noStroke()
        fill('gold')
        const numOfCorners = 5
        const angle = TWO_PI / numOfCorners
        const offset = - PI / 2
        const ratio = 5 / 2
        const radius1 = size / 2
        const radius2 = radius1 / ratio

        beginShape()
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = cos(offset + a) * radius1
            let sy = sin(offset + a) * radius1
            vertex(sx, sy)
            sx = cos(offset + a + angle / 2) * radius2
            sy = sin(offset + a + angle / 2) * radius2
            vertex(sx, sy)
        }
        endShape(CLOSE)
    }
}