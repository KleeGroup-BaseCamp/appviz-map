import * as p5 from "p5"
import {AbstractRadar2} from "./abstractRadar2"

export class SharpRadar2 extends AbstractRadar2 {

    renderGraph(): void{
        beginShape()
        for (let i = 0 ; i< this.radarDataSystem.points.length; i++){
            const point = p5.Vector.mult(this.radarDataSystem.points[i], this.progressRatio)
            vertex(point.x, point.y)
        }
        endShape(CLOSE)
    }
}