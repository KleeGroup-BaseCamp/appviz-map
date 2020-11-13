import {AbstractRating} from "./abstractRating"
import {style} from "../app"

export class HeartRating2 extends AbstractRating{
    
    public renderRatingIcon(size: number, value: number): void{
        //value must be in (0 ; 0.5; 1)     
        noStroke()

        //1. Dispay a full grey heart  
        fill(style.color.front)
        if (value !==1){
            //only int or half-int are accepted 
            this.renderHearth(size, false)
        }

        //2. Dispay a red heart (full ot half on the left)  
        fill('red')
        const half = (value===0.5)
        if (value ===0.5 || value ===1){
            this.renderHearth(size, half)
        }
    }

    private renderHearth(size : number, half : boolean){
        push()
        translate(size / 2, 0)
        beginShape()
        vertex(0, size / 3)
        bezierVertex(- size / 2, 0, - size * 2 / 3, size * 2 / 3, 0, size)
        if (! half){
            bezierVertex(size * 2 / 3, size * 2 / 3, size / 2, 0, 0, size / 3)
        }
        endShape(CLOSE)
        pop()
    }    
}