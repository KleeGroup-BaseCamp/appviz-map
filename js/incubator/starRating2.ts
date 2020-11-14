import {AbstractRating} from "./abstractRating"
import {style} from "../app"


export class StarRating2 extends AbstractRating{
    private readonly corners: number = 5
    
    public renderIcon(size: number, active: boolean, ratio: number): void{
        if (ratio<0.5) return
        if (active){
            fill('gold')
        }
       
        const externalRadius = size / 2
        const internalRadius = externalRadius / 2.5

        noStroke()
        push()
        rotate(-PI / 2)
        translate(- externalRadius, externalRadius)
 
        //2. Dispay a gold star (full ot half on the left)  
 
        //Angle between external and internal edges
        // = angle of an external edge (convex)
        // = angle of an internal edge (concave)
        const angle = TWO_PI / (2*this.corners)

        //There are two sets of edges (internal and external) 
        //The number of edges tha must be displayed
        const edges = this.corners * (ratio===1?2:1)+1
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