import p5 from "p5"
import {AbstractRadar} from "./abstractRadar"

export class SharpRadar extends AbstractRadar {

    renderGraph(): void{
        beginShape()
        for (let i = 0 ; i< this.radarDataSystem.points.length; i++){
            const point = p5.Vector.mult(this.radarDataSystem.points[i], this.progressRatio)
            vertex(point.x, point.y)
        }
        endShape(CLOSE)
    }
}