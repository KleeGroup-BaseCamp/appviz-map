import {AbstractRating} from "./abstractRating"
import {style} from "../app"


export class StarRating2 extends AbstractRating{
    private readonly corners: number = 5
    
    public renderRatingIcon(size: number, value: number): void{
        noStroke()
        push()
        rotate(-PI / 2)
        //1. Dispay a full grey star  
        fill(style.color.front)
        if (value !==1){
            //only int or half-int are accepted 
            this.renderStar(size, false)
        }

        //2. Dispay a gold star (full ot half on the left)  
        fill('gold')
        const half = (value===0.5)
        if (value ===0.5 || value ===1){
            this.renderStar(size, half)
        }

        pop()
    }

    private renderStar(size: number, half: boolean): void {
        const externalRadius = size / 2
        const internalRadius = externalRadius / 2.5

        //Angle between external and internal edges
        // = angle of an external edge (convex)
        // = angle of an internal edge (concave)
        const angle = TWO_PI / (2*this.corners)

        //There are two sets of edges (internal and external) 
        //The number of edges tha must be displayed
        const edges = this.corners * (half?1:2)+1
        push()
        translate(- externalRadius, externalRadius)
        beginShape()
        for (let i = 0; i <  edges; i++) {
            const radius = i%2==0? externalRadius : internalRadius
            const x = cos(angle * i) * radius    
            const y = - sin(angle * i) * radius 
            vertex(x, y)
        }
        endShape(CLOSE)
        pop()
    }
}