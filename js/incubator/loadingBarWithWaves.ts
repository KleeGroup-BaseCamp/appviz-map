import { VElement } from "../core";
import { PxSize } from "../layout";
import {AnimationUtils} from "../utils"
import {style} from "../app"

export class LoadingBarWithWaves extends VElement{


    private value: number
    private maxAmplitude: number
    private time: number

    constructor(id: any, pxSize: PxSize, value: number){ // value -> intensity ?
        super(id, pxSize, false)
        // Initialise with some value
        this.value = value
        this.maxAmplitude = 0 
        this.time = 0
        
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, value, duration, (s:number) => this.value = s)
        AnimationUtils.animate(30, 0, duration * 10, (s:number) => this.maxAmplitude = s)
        AnimationUtils.animate(0, 100, duration * 10, (s:number) => this.time = s)
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
    /**
     * 
     * @param yFill y coordinate of "liquid" surface
     * @param barWidth With of bar/container
     */
    private renderWave(yFill: number, barWidth: number): void{
        push()
        stroke(style.color.front)
        translate(0, yFill)
        const period = 10
        const fillHeight = this.getPxSize().getHeight() - yFill 
        const amplitude = min(min(this.maxAmplitude, fillHeight), yFill) // bounding box constraints
        beginShape()
        vertex(0, 0)
        bezierVertex(
            barWidth / 3, 
            - amplitude * sin(TWO_PI * this.time / period), 
            barWidth * 2 / 3, 
            - amplitude * sin(TWO_PI * this.time / period + HALF_PI), 
            barWidth, 
            0
            )
        endShape()
        pop()
    }
}