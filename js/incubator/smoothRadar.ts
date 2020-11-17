import {style} from "../app"
import { PxPosition} from "../layout"
import { AbstractRadar } from "./abstractRadar"

export class SmoothRadar extends AbstractRadar{

    renderGraph(): void{
        beginShape()
        const dimension = this.values.length
        const angleStep = TWO_PI / dimension
        vertex(
            (this.values[0] / 100) * this.radius * cos(- HALF_PI), 
            (this.values[0] / 100) * this.radius * sin(- HALF_PI)
        )
        for(let i = 0; i < dimension; i++){
            const position1 = this.getControlPointPosition(i, dimension, angleStep)   
            const position2 = this.getControlPointPosition(i + 1, dimension, angleStep)  
            bezierVertex(
                (this.values[i] / 100) * this.radius * cos(- HALF_PI + angleStep * i) + position1.getX(),
                (this.values[i] / 100) * this.radius * sin(- HALF_PI + angleStep * i) + position1.getY(),
                (this.values[(i + 1) % dimension] / 100) * this.radius * cos(- HALF_PI + angleStep * ((i + 1) % dimension)) - position2.getX(),
                (this.values[(i + 1) % dimension] / 100) * this.radius * sin(- HALF_PI + angleStep * ((i + 1) % dimension)) - position2.getY(),
                (this.values[(i + 1) % dimension] / 100) * this.radius * cos(- HALF_PI + angleStep * ((i + 1) % dimension)),
                (this.values[(i + 1) % dimension] / 100) * this.radius * sin(- HALF_PI + angleStep * ((i + 1) % dimension))
            )
        }
        endShape(CLOSE)
    }

    /**
     * Compute control points positions so that:
     * 1 - Control points of a Bezier curve are bound to the space delimited by angleStep --> Curve is bounded too
     * 2 - Combination of successive beziers curves is a C1 continuous curve --> Final curve is C1 continuous (smooth)
     * 
     * @param index Bezier curve index
     * @param dimension Number of values/labels
     * @param angleStep Angle between two consecutive values/labels
     */
    private getControlPointPosition(index: number, dimension: number, angleStep: number): PxPosition{
        const dx = (angleStep * (index % dimension) - HALF_PI) % PI !== 0 ? min(abs((this.values[index % dimension] / 100) * this.radius * tan(angleStep) * cos(angleStep * (index % dimension)) / 2), this.radius * cos(asin(this.values[index % dimension] / 100))) * cos(angleStep * (index % dimension)) / abs(cos(angleStep * (index % dimension))) : 0
        const dy = (angleStep * (index % dimension)) % PI !== 0 ? min(abs((this.values[index % dimension] / 100) * this.radius * tan(angleStep) * sin(angleStep * (index % dimension)) / 2), this.radius * cos(asin(this.values[index % dimension] / 100))) * sin(angleStep * (index % dimension)) / abs(sin(angleStep * (index % dimension))) : 0  
        return new PxPosition(dx, dy)
    }
}