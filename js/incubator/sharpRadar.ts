import {style} from "../app"
import { AbstractRadar } from "./abstractRadar"

export class SharpRadar extends AbstractRadar{
    renderGraph(): void{
        beginShape()
        const dimension = this.values.length
        const angleStep = TWO_PI / dimension
        for(let i = 0; i < dimension; i++){
            const r =(this.values[i] / 100) * this.radius     
            vertex(
                r * cos(- HALF_PI + angleStep * i),
                r * sin(- HALF_PI + angleStep * i)
            )
        }
        endShape(CLOSE)
    }
}