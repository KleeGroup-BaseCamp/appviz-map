import * as p5 from "p5"
import {VElement} from "../core"
import {PxPosition, PxSize} from "../layout"
import {AnimationUtils} from "../utils"
import {style} from "../app"

export class Signal extends VElement{
    private readonly radius: number
    private readonly circleCenterPosition: PxPosition
    private readonly weight: number

    private rate: number

    constructor(id: any, pxSize: PxSize, rate: number){
        super(id, pxSize, false)
        this.rate = rate
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
        AnimationUtils.animate(0, rate, duration, (s:number) => this.rate = s)
    }

    public render() : void {
        strokeWeight(this.weight)
        const circleRadius = this.radius * 2 / 10
        push()
        translate(0, - (this.getPxSize().getHeight() - this.radius - this.weight - circleRadius) / 2)
        this.renderArcs()
        this.renderCircle(circleRadius) 
        pop()       
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
        return this.rate > i ? style.text.color.primary : style.color.front
    }

    private renderCircle(circleRadius: number): void{
        fill(this.pickColor(0))
        noStroke()
        circle(
            this.circleCenterPosition.getX(), 
            this.circleCenterPosition.getY(),
            circleRadius
        )
    }
}