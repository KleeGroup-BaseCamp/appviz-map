import {AbstractRating} from "./abstractRating"

export class StarRating2 extends AbstractRating{
    
    public renderRatingIcon(size: number, value: number): void{
        const ratio = 5 / 2
        noStroke()
        fill('gold')
        this.star(0, 0, size / (2 * ratio), size / 2, 5);
    }

    private star(x: number, y: number, radius1: number, radius2: number, npoints: number) {
        let angle = TWO_PI / npoints;
        let halfAngle = angle / 2.0;
        let b = - PI/2
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = x + cos(a + b) * radius2;
            let sy = y + sin(a + b) * radius2;
            vertex(sx, sy);
            sx = x + cos(a + b + halfAngle) * radius1;
            sy = y + sin(a + b + halfAngle) * radius1;
            vertex(sx, sy);
        }
        endShape(CLOSE);
        }
}