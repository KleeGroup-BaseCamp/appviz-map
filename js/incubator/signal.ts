import { VElement } from "../core";
import { PxPosition, PxSize } from "../layout";
import {AnimationUtils} from "../utils"
import {style} from "../app"

export class Signal extends VElement{
    private readonly radius: number
    private readonly centerPosition: PxPosition

    private value: number

    constructor(id: any, pxSize: PxSize, value: number){
        super(id, pxSize, false)
        this.value = value
        this.radius = min(pxSize.getHeight(), pxSize.getWidth()) / 2
        this.centerPosition = new PxPosition(
            pxSize.getWidth() / 2,
            pxSize.getHeight() / 2
            )
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, value, duration, (s:number) => this.value = s)
    }

    public render() : void {
        const weight: number = 6
        noFill()
        strokeCap(ROUND)
        strokeWeight(weight)
        stroke(style.text.color.primary)
        for (let i = 0; i < 4; i ++){
            if (i >= this.value - 1){
                stroke(style.color.front)
            }
            arc(
                this.centerPosition.getX(), 
                this.centerPosition.getY(),
                this.radius * 2 * (i + 1) / 4,
                this.radius * 2 * (i + 1) / 4,
                PI + QUARTER_PI,
                - QUARTER_PI
            )
        }
        fill(this.value > 0 ? style.text.color.primary : style.color.front)
        noStroke()
        circle(
            this.centerPosition.getX(), 
            this.centerPosition.getY(),
            this.radius * 2 / 10
        )
    }
}