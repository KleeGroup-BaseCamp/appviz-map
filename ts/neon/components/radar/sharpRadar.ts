import {AbstractRadar} from "./abstractRadar"

export class SharpRadar extends AbstractRadar{
    renderGraph(): void{
        const dimension = this.values.length
        const angleStep = TWO_PI / dimension

        beginShape()
        for(let i = 0; i < dimension; i++){
            const r =(this.values[i] / 100) * this.radius     
            const alpha = - HALF_PI + angleStep * i 
            vertex(
                r * cos(alpha),
                r * sin(alpha)
            )
        }
        endShape(CLOSE)
    }
}