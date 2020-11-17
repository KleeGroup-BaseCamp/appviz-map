import {style} from "../app"
import { AbstractRadar } from "./abstractRadar"

export class SharpRadar extends AbstractRadar{
    renderGraph(): void{
        beginShape()
        const dimension = this.values.length
        const angleStep = TWO_PI / dimension
        for(let i = 0; i < dimension; i++){
            vertex(
                (this.values[i] / 100) * this.radius * cos(- HALF_PI + angleStep * i),
                (this.values[i] / 100) * this.radius * sin(- HALF_PI + angleStep * i)
            )
        }
        endShape(CLOSE)
    }
}