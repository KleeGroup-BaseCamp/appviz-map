import * as p5 from "p5"
import {VElement} from "../core"
import {PxPosition, PxSize} from "../layout"
import {AnimationUtils} from "../utils"
import {style} from "../app"

export class Signal extends VElement{
    private readonly radius: number
    private readonly circleCenterPosition: PxPosition
    private readonly weight: number

    private value: number

    constructor(id: any, pxSize: PxSize, value: number){
        super(id, pxSize, false)
        this.value = value
        this.weight = 6
        this.circleCenterPosition = new PxPosition(
            pxSize.getWidth() / 2,
            pxSize.getHeight() - this.weight
        )
        this.radius = min(
            pxSize.getHeight() - 2 * this.weight, 
            (pxSize.getWidth() - 2 * this.weight) / sqrt(2)
        )
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, value, duration, (s:number) => this.value = s)
    }

    public render() : void {
        strokeWeight(this.weight)
        this.renderArcs()
        this.renderCircle()        
    }

    private renderArcs(): void {
        const stripes = 4

        noFill()
        strokeCap(ROUND)
        for (let i = 0; i < stripes; i ++){
            stroke(this.pickColor(i + 1))
            arc(
                this.circleCenterPosition.getX(), 
                this.circleCenterPosition.getY(),
                this.radius * 2 * (i + 1) / stripes,
                this.radius * 2 * (i + 1) / stripes,
                PI + QUARTER_PI,
                - QUARTER_PI
            )
        }
    }

    private pickColor(i:number): p5.Color{
        return this.value > i ? style.text.color.primary : style.color.front
    }

    private renderCircle(): void{
        fill(this.pickColor(0))
        noStroke()
        circle(
            this.circleCenterPosition.getX(), 
            this.circleCenterPosition.getY(),
            this.radius * 2 / 10
        )
    }
}