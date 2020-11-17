import {style} from "../app"
import { AbstractRadar } from "./abstractRadar"

export class SmoothRadar extends AbstractRadar{

    renderGraph(): void{
        strokeWeight(2)
        stroke(style.color.a)
        beginShape()
        const dimension = this.values.length
        const angleStep = TWO_PI / dimension
        vertex(
            (this.values[0] / 100) * this.radius * cos(- HALF_PI), 
            (this.values[0] / 100) * this.radius * sin(- HALF_PI)
        )
        for(let i = 0; i < dimension; i++){
            bezierVertex(
                (this.values[i] / 100) * this.radius * cos(- HALF_PI + angleStep * i) + (this.values[i] / 100) * this.radius * tan(angleStep) * cos(angleStep * i) / 2,
                (this.values[i] / 100) * this.radius * sin(- HALF_PI + angleStep * i) + (this.values[i] / 100) * this.radius * tan(angleStep) * sin(angleStep * i) / 2,
                (this.values[(i + 1) % dimension] / 100) * this.radius * cos(- HALF_PI + angleStep * ((i + 1) % dimension)) - (this.values[(i + 1) % dimension] / 100) * this.radius * tan(angleStep) * cos(angleStep * ((i + 1) % dimension)) / 2,
                (this.values[(i + 1) % dimension] / 100) * this.radius * sin(- HALF_PI + angleStep * ((i + 1) % dimension)) - (this.values[(i + 1) % dimension] / 100) * this.radius * tan(angleStep) * sin(angleStep * ((i + 1) % dimension)) / 2,
                (this.values[(i + 1) % dimension] / 100) * this.radius * cos(- HALF_PI + angleStep * ((i + 1) % dimension)),
                (this.values[(i + 1) % dimension] / 100) * this.radius * sin(- HALF_PI + angleStep * ((i + 1) % dimension))
            )
        }
        endShape(CLOSE)

        // strokeWeight(1)
        // stroke(255)
        // beginShape()
        // for(let i = 0; i < dimension; i++){
            // vertex(
            //     (this.values[i] / 100) * this.radius * cos(- HALF_PI + angleStep * i),
            //     (this.values[i] / 100) * this.radius * sin(- HALF_PI + angleStep * i)
            // )
            // curveVertex(
            //     (this.values[i] / 100) * this.radius * cos(- HALF_PI + angleStep * i),
            //     (this.values[i] / 100) * this.radius * sin(- HALF_PI + angleStep * i)
            // )
        // }
        // endShape(CLOSE)

    }
}