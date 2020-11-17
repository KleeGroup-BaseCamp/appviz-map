import { VText } from "../components";
import { VElement } from "../core";
import { PxPosition, PxSize } from "../layout";
import {AnimationUtils} from "../utils"
import {style} from "../app"
import * as p5 from "p5";

export class Radar extends VElement{
    private readonly radius: number
    private readonly centerPosition: PxPosition
    private readonly vtexts: VText[]
    private readonly dimension: number
    private readonly textMargin: number

    private readonly values: number[]

    constructor(id: any, pxSize: PxSize, values: number[]){
        super(id, pxSize, false)
        this.values = values
        this.dimension = values.length

        const size = style.text.size.xxs
        this.vtexts = Array.from(
            {length: this.dimension}, 
            (_, i) => new VText((i + 1).toString(), style.text.font, size, style.text.color.secondary)
        )
        textSize(size)
        this.textMargin = max(textAscent(), textWidth('4')) + 5 // No support for dimension >= 10
        this.radius = min(pxSize.getHeight(), pxSize.getWidth()) / 2 - this.textMargin
        this.centerPosition = new PxPosition(
            pxSize.getWidth() / 2, 
            pxSize.getHeight() / 2
            )
        const duration = 1000 /*ms*/
        // AnimationUtils.animate(0, value, duration, (s:number) => this.value = s)
    }

    public render() : void {
        push()
        translate(this.centerPosition.getX(), this.centerPosition.getY())
        this.renderRadar()
        this.renderGraph()
        pop()
    }

    /**
     * 
     * @param start Arc starting angle (from - HALF_PI & anti-clockwise) 
     * @param angleDiff = Arc angle = end angle - start angle
     */

    private renderRadar(): void{
        const numOfCircles = 4
        noFill()
        stroke(style.color.front)

        // Outer circle
        strokeWeight(2)
        circle(0,0, this.radius * 2)

        // Inner circles
        strokeWeight(1)
        for(let i = 0; i < numOfCircles - 1; i++){
            circle(0,0, this.radius * 2 * (i + 1) / numOfCircles)
        }

        // Lines
        const angleStep = TWO_PI / this.dimension
        for(let i = 0; i  < this.dimension; i++){
            const x = this.radius * cos(- HALF_PI + angleStep * i)
            const y = this.radius * sin(- HALF_PI + angleStep * i)
            line(
                0, 
                0,
                x,
                y
            )
            push()
            translate(x + (this.textMargin / 2)  * cos(- HALF_PI + angleStep * i), y + (this.textMargin / 2) * sin(- HALF_PI + angleStep * i))
            textAlign(CENTER, CENTER)
            this.vtexts[i].render()
            pop()
        }
    }

    renderGraph(): void{
        strokeWeight(2)
        stroke(style.color.a)
        beginShape()
        const angleStep = TWO_PI / this.dimension
        for(let i = 0; i < this.dimension; i++){
            vertex(
                (this.values[i] / 100) * this.radius * cos(- HALF_PI + angleStep * i),
                (this.values[i] / 100) * this.radius * sin(- HALF_PI + angleStep * i)
            )
        }
        endShape(CLOSE)
    }
}