import {AbstractRating} from "./abstractRating"
import {style} from "../app"


export class StarRating2 extends AbstractRating{
    private readonly corners: number = 5
    
    public renderRatingIcon(size: number, value: number): void{
        noStroke()
        const angle = TWO_PI / this.corners
        const externalRadius = size / 2
        const internalRadius = externalRadius / 2.5

        push()
        rotate(-PI/2)
        fill('gold')
        if (value===1){
            this.renderStar(angle, externalRadius, internalRadius, true, true)
        }else if (value===0.5){
            //Half Star
            this.renderStar(angle, externalRadius, internalRadius, true, false)
        }

        fill(style.color.front)
        if (value !=1 && value !=0.5){
            //only int or half-int are accepted 
            this.renderStar(angle, externalRadius, internalRadius, true, true)
        }else if (value===0.5){
            //Half Star
            this.renderStar(angle, internalRadius, internalRadius, false, true)
        }
        pop()
    }

    private renderStar(angle: number, externalRadius: number, internalRadius: number, left: boolean, right: boolean): void {
        beginShape()
        for (let i = 0; i <  this.corners; i++) {
            if (i == 0 || right && i <= 2 || left && i >= 3){
                let sx = cos(angle * i) * externalRadius
                let sy = sin(angle * i) * externalRadius
                vertex(sx, sy)
            }
            if(right && i <= 2 || left && i >= 2){
                let sx = cos(angle * (i + 1 / 2)) * internalRadius
                let sy = sin(angle * (i + 1 / 2)) * internalRadius
                vertex(sx, sy)
            }
        }
        endShape(CLOSE)
    }
}