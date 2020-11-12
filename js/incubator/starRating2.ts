import {AbstractRating} from "./abstractRating"
import {style} from "../app"


export class StarRating2 extends AbstractRating{
    
    public renderRatingIcon(size: number, value: number): void{
        noStroke()
        const angle = TWO_PI / 5 // numOfCorners = 5
        const ratio = 5 / 2
        const radius1 = size / 2
        const radius2 = radius1 / ratio

        push()
        rotate(-PI/2)
        fill('gold')
        if (value===1){
            this.renderStar(angle, radius1, radius2, true, true)
        }else if (value===0.5){
            //Half Star
            this.renderStar(angle, radius1, radius2, true, false)
        }

        fill(style.color.front)
        if (value !=1 && value !=0.5){
            //only int or half-int are accepted 
            this.renderStar(angle, radius1, radius2, true, true)
        }else if (value===0.5){
            //Half Star
            this.renderStar(angle, radius1, radius2, false, true)
        }
        pop()
    }

    private renderStar(angle: number, radius1: number, radius2: number, left: boolean, right: boolean): void {
        beginShape()
        for (let i = 0; i < 5; i++) {
            if (i == 0 || right && i <= 2 || left && i >= 3){
                let sx = cos(angle * i) * radius1
                let sy = sin(angle * i) * radius1
                vertex(sx, sy)
            }
            if(right && i <= 2 || left && i >= 2){
                let sx = cos(angle * (i + 1 / 2)) * radius2
                let sy = sin(angle * (i + 1 / 2)) * radius2
                vertex(sx, sy)
            }
        }
        endShape(CLOSE)
    }
}