import {style} from "../app"
import { PxPosition} from "../layout"
import { AbstractRadar } from "./abstractRadar"

export class SmoothRadar extends AbstractRadar{

    renderGraph(): void{
        beginShape()
        const dimension = this.values.length
        const angleStep = TWO_PI / dimension
        vertex(
            (this.values[0] / 100) * this.radius * cos(- HALF_PI), // Value point 0
            (this.values[0] / 100) * this.radius * sin(- HALF_PI)
        )
        for(let i = 0; i < dimension; i++){
            const position1 = this.getControlPointPosition(i, dimension, angleStep)   
            const position2 = this.getControlPointPosition(i + 1, dimension, angleStep)  
            bezierVertex(
                (this.values[i] / 100) * this.radius * cos(- HALF_PI + angleStep * i) + position1.getX(), // Value point i 2nd control point
                (this.values[i] / 100) * this.radius * sin(- HALF_PI + angleStep * i) + position1.getY(),
                (this.values[(i + 1) % dimension] / 100) * this.radius * cos(- HALF_PI + angleStep * ((i + 1) % dimension)) - position2.getX(), // Value point i+1 1st control point
                (this.values[(i + 1) % dimension] / 100) * this.radius * sin(- HALF_PI + angleStep * ((i + 1) % dimension)) - position2.getY(),
                (this.values[(i + 1) % dimension] / 100) * this.radius * cos(- HALF_PI + angleStep * ((i + 1) % dimension)), // Value point i+1
                (this.values[(i + 1) % dimension] / 100) * this.radius * sin(- HALF_PI + angleStep * ((i + 1) % dimension))
            )
        }
        endShape(CLOSE)
    }

    /**
     * Compute control points positions so that:
     * Control points of a Bezier curve are bound to the space delimited by angleStep and by the circle --> Curve is bounded too
     *     - The 2 control points next to a value point are on the normal to the radius going through that point
     *     - Their distance to the value point is proportional to the value: value * radius * tan(angleStep) / 100
     *         --> Bound to the space delimited by angleStep (Limit for angle in polar coordinate system)
     *     - Their distance to the value point can't exceed the distance to the circle boundary: radius * cos(asin(value * 100)) 
     *         --> Bound to the biggest radar circle (Limit for radius in polar coordinate system)
     *  As a result of having the distance from the value point for both control points the same, as well as having them all aligned,
     *  the resulting bezier curve is C1 continuous(smooth).
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