import { VElement } from "../core";
import { PxSize } from "../layout";
import {AnimationUtils} from "../utils"
import {style} from "../app"

export class LoadingBarWithWaves extends VElement{


    private value: number
    private readonly waveScalingRatio = 0.75

    constructor(id: any, pxSize: PxSize, value: number){ // value -> intensity ?
        super(id, pxSize, false)
        this.value = value
        const duration = 1000 /*ms*/
        // AnimationUtils.animate(0, value, duration, (s:number) => this.value = s)
    }

    public render() : void {
        strokeJoin(ROUND)
        strokeWeight(2)
        fill(style.color.front)
        noStroke()
        const barHeight = this.getPxSize().getHeight()
        const barWidth = this.getPxSize().getWidth()
        const yFill = barHeight * (1 - this.value / 100) // y coordinate of "liquid" surface

        //Render "liquid"
        rect(0, yFill, barWidth, barHeight - yFill)

        //Render wave
        this.renderWave(yFill, barWidth)

        // Render Bar/container
        noFill()
        stroke(style.text.color.primary)
        rect(0,0, this.getPxSize().getWidth(), this.getPxSize().getHeight())
    }

    private renderWave(yFill: number, barWidth: number): void{
        push()
        stroke(style.color.front)
        scale(this.waveScalingRatio, 1) // Looks more like a wave
        const diameter = barWidth / (sqrt(2) * this.waveScalingRatio)
        // rect(0, sqrt(2) * diameter / 4, 300,100)
        noFill()
    
        arc(
            0,
            0, 
            diameter, 
            diameter, 
            QUARTER_PI, 
            HALF_PI
        )
        arc(
            2 * diameter - (2 - sqrt(2)) * diameter, 
            0, 
            diameter, 
            diameter, 
            HALF_PI, 
            PI - QUARTER_PI
        )

        arc(
            diameter - (2 - sqrt(2)) * diameter / 2, sqrt(2) * diameter / 2, 
            diameter, 
            diameter, 
            PI + QUARTER_PI, 
            -QUARTER_PI
        )
        pop()
    }

}