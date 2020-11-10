import {AbstractRating} from "./abstractRating";
import {style} from "../app"

export class HeartRating2 extends AbstractRating{
    
    public renderRatingIcon(size: number, value: number): void{
        //value must be in (O ; 0.5; 1)     
        noStroke()
        fill(255, 0, 0)
        if (value===1){
            this.renderHearth(size, true, true)
        }else if (value===0.5){
            this.renderHearth(size, true, false)
        }
        fill(style.color.front)
        if (value !=1 && value !=0.5){
            //only int or half-int are accepted 
            this.renderHearth(size, true, true)
        }else if (value===0.5){
            this.renderHearth(size, false, true)
        }
    }

        private renderHearth(size : number, left : boolean, right : boolean, ){
            beginShape()
            if(left){
                vertex(0, 0)
                bezierVertex(- size / 2 , - size / 2, - size    , size / 3      , 0 , size)
            }
            if (right){
                vertex(0, size)
                bezierVertex(+ size     , size / 3  , size / 2  , - size / 2    , 0 , 0)
            }
            endShape(CLOSE)
        }    
    }