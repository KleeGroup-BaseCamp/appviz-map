import * as p5 from "p5"
import {Component, ComponentProps} from "../../core"
import {AnimationUtils} from "../../utils"

export interface WifiSignalProps extends ComponentProps {}

export class WifiSignal extends Component{
    private readonly radius: number
    private readonly circleCenterPosition: p5.Vector
    private readonly weight: number

    private rate: number

    constructor(rate: number, props : WifiSignalProps){
        super(props, "Signal", false)
        this.rate = rate
        this.weight = min(this.getHeight(), this.getWidth()) / 15
        this.circleCenterPosition = createVector(
            this.getWidth() / 2,
            this.getHeight() - this.weight
        )
        this.radius = min(
            this.getHeight() - 2 * this.weight, 
            (this.getWidth() - 2 * this.weight) / sqrt(2)
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
                this.circleCenterPosition.x, 
                this.circleCenterPosition.y,
                this.radius * 2 * (i + 1) / stripes,
                this.radius * 2 * (i + 1) / stripes,
                PI + QUARTER_PI,
                - QUARTER_PI
            )
        }
    }

    private pickColor(i:number): p5.Color{
        return this.rate > i 
        ? this.style.text.color.primary 
        : this.style.color.front
    }

    private renderCircle(circleRadius: number): void{
        fill(this.pickColor(0))
        noStroke()
        circle(
            this.circleCenterPosition.x, 
            this.circleCenterPosition.y,
            circleRadius
        )
    }
}