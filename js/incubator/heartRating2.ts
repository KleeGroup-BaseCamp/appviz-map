import {AbstractRating} from "./abstractRating"
import {style} from "../app"

export class HeartRating2 extends AbstractRating{
    
    public renderIcon(size : number, active : boolean, ratio : number):void {
        if (ratio<0.5) return
        
        if (active){
            fill('red')
        }
        push()
        translate(size / 2, 0)
        beginShape()
        vertex(0, size / 3)
        bezierVertex(- size / 2, 0, - size * 2 / 3, size * 2 / 3, 0, size)
        if (ratio==1){
            bezierVertex(size * 2 / 3, size * 2 / 3, size / 2, 0, 0, size / 3)
        }
        endShape(CLOSE)
        pop()
    }    
}