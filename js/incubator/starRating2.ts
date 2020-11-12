import {AbstractRating} from "./abstractRating"

export class StarRating2 extends AbstractRating{
    
    public renderRatingIcon(size: number, value: number): void{
        noStroke()
        fill('gold')
        const numOfCorners = 5
        const angle = TWO_PI / numOfCorners
        const ratio = 5 / 2
        const radius1 = size / 2
        const radius2 = radius1 / ratio
        push()
        rotate(-PI/2)
        this.renderStar(angle, radius1, radius2)
        pop()
    }

    private renderStar(angle: number, radius1: number, radius2: number): void {
        beginShape()
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = cos(a) * radius1
            let sy = sin(a) * radius1
            vertex(sx, sy)
            sx = cos(a + angle / 2) * radius2
            sy = sin(a + angle / 2) * radius2
            vertex(sx, sy)
        }
        endShape(CLOSE)
    }
}