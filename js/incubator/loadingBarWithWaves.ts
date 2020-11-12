import { VElement } from "../core";
import { PxSize } from "../layout";
import {AnimationUtils} from "../utils"
import {style} from "../app"

export class LoadingBarWithWaves extends VElement{


    private value: number

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
        const controlPointDistance = 0.36 // https://www.desmos.com/calculator/mtdihhagsx
        const waveHeight = min(yFill, 20)
        beginShape()
        vertex(0, yFill)
        bezierVertex(
            (barWidth / 2) * controlPointDistance,
            yFill, 
            (barWidth / 2) * (1 - controlPointDistance),
            yFill - waveHeight, 
            barWidth / 2,
            yFill - waveHeight
        )
        bezierVertex(
            (barWidth / 2) * (1 + controlPointDistance),
            yFill - waveHeight, 
            barWidth - (barWidth / 2) * controlPointDistance, 
            yFill, 
            barWidth, 
            yFill)
        endShape()
    }

}