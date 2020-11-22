import p5 from "p5"
import {AbstractRadar} from "./abstractRadar"

export class SmoothRadar extends AbstractRadar{
    renderGraph(): void{
        const points :p5.Vector[] = this.radarDataSystem.points 

        let prevPoint :p5.Vector = p5.Vector.mult(points[0], this.progressRatio)
        beginShape()
        vertex(prevPoint.x, prevPoint.y)
        for (let i=1 ; i<= points.length; i++){
            const point = p5.Vector.mult(this.radarDataSystem.getPoint(i), this.progressRatio)
            let controlPoint1 = p5.Vector.add(prevPoint, this.radarDataSystem.tangent(i-1)
                .mult(0.5)
                .mult(this.progressRatio))
            let controlPoint2 = p5.Vector.sub(point, this.radarDataSystem.tangent(i)
                .mult(0.5))
                .mult(this.progressRatio)
            bezierVertex (
                controlPoint1.x, controlPoint1.y, 
                controlPoint2.x, controlPoint2.y, 
                point.x, point.y)
            prevPoint = point    
        }
        endShape(CLOSE)
    }
}
