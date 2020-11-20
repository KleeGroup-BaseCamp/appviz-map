import * as p5 from "p5"
import {VElement} from "../core"
import {PxPosition, PxSize} from "../layout"
import {AnimationUtils} from "../utils"
import {style} from "../app"

type Bubble = {
    id : number,
    size: number,
    position: PxPosition
    color: p5.Color
}

export class Battery extends VElement{
    private readonly primaryColor: p5.Color =color("#32CD32")// Light green
    private readonly secondaryColor: p5.Color =color("#006400")// Dark green

    private readonly padding: number
    private readonly topMargin: number
    private readonly maxBubbleSize : number
    private readonly bubbles : Bubble[] = []

    private percent: number
    private maxAmplitude: number
    private time: number // TO DO: Use better name

    constructor(id: any, pxSize: PxSize, percent: number){
        super(id, pxSize, false)
        this.percent = percent
        this.maxAmplitude = 0 
        this.time = 0
        this.maxBubbleSize = 8
        this.padding = 5
        this.topMargin = 10 // Margin for hat
        const barWidth = pxSize.getWidth() - 2 * this.padding
        const barHeight = pxSize.getHeight() - this.padding - this.topMargin
        const numOfBubbles = 5 
        for(let i = 0; i < numOfBubbles; i++){
            this.bubbles.push({
                id : i,
                size : 0,
                position :  new PxPosition( barWidth / 4 + random(barWidth / 2), 0),
                color: this.secondaryColor
            })
        }
        const duration = 3000 /*ms*/
        AnimationUtils.animate(0, percent, duration, (s:number) => this.percent = s)
        AnimationUtils.animate(50, 0, duration * 10, (s:number) => this.maxAmplitude = s)
        AnimationUtils.animate(0, 100, duration * 10, (s:number) => this.time = s)
        for(let bubble of this.bubbles){
            // TO DO : Change size and color only once 
            AnimationUtils.animate(0, 100, duration * 3, (s:number) => bubble.size = (1 - abs(50-s) / 50) * this.maxBubbleSize)
            AnimationUtils.animate(
                barHeight, 
                0, 
                duration * 3, 
                (s:number) => {
                    const coneWidth = barWidth * (barHeight - s) / barHeight
                    // Bubble tends to be around this position
                    const xLimit = (barWidth - coneWidth) / 2 + coneWidth * bubble.id / (numOfBubbles - 1) 
                    const x = min(
                        max(
                            bubble.position.getX() + sin(s / (5 + bubble.id)) + (xLimit - bubble.position.getX()) * random(0.1),
                            bubble.size
                        ), 
                        barWidth - bubble.size
                    ) // Bubble boundaries 
                    bubble.position = new PxPosition(x, s)
                }
            )
            AnimationUtils.animate(
                0, 
                100, 
                duration * 3, 
                (s:number) => bubble.color = lerpColor(this.secondaryColor, 
                color(255), 
                s / 100)
            )
        }
    }

    public render() : void {
        push()
        translate(this.padding, this.padding + this.topMargin)
        this.renderWaves()
        this.renderBubbles()
        pop()

        this.renderContainer()
    }

    private renderContainer(){
        noFill()
        const weight = 2
        strokeWeight(this.padding)
        stroke(style.color.back)
        rect(
            this.padding / 2, 
            this.padding / 2 + this.topMargin, 
            this.getPxSize().getWidth() - this.padding, 
            this.getPxSize().getHeight() - this.padding - this.topMargin, 
            15
        )

        strokeWeight(weight)
        stroke(style.text.color.primary)
        rect(0, this.topMargin, this.getPxSize().getWidth(), this.getPxSize().getHeight() - this.topMargin, 15)

        const hatWidth = 30
        fill(style.text.color.primary)
        rect((this.getPxSize().getWidth() - hatWidth) / 2, 0, hatWidth, this.topMargin - this.padding, 20, 20, 0, 0)
    }

    /**
     * @param yFill y coordinate of "liquid" surface
     * @param barWidth With of bar/container
     */
    private renderWaves(): void{
        const barHeight = this.getPxSize().getHeight() - this.padding * 2 - this.topMargin
        const barWidth = this.getPxSize().getWidth() - this.padding * 2
        const yFill = barHeight * (1 - this.percent / 100) // y coordinate of "liquid" surface

        const period = 15
        const fillHeight = barHeight - yFill 
        const amplitude = min(min(this.maxAmplitude, fillHeight), yFill) // bounding box constraints

        noStroke()
        // First wave
        fill(this.secondaryColor)
        blendMode(LIGHTEST);
        this.renderWave(yFill, barWidth, barHeight, amplitude, period, QUARTER_PI) 

        // Second wave
        fill(this.primaryColor)
        this.renderWave(yFill, barWidth, barHeight, amplitude/2, period*2, -QUARTER_PI) 
    }

    private renderWave(yFill: number, barWidth:number, barHeight:number, 
        amplitude: number, period: number, omega: number):void{
        beginShape()
        vertex(0, yFill)
        bezierVertex(
            barWidth / 3, 
            yFill- amplitude * sin(TWO_PI * this.time / period + QUARTER_PI + omega), 
            barWidth * 2 / 3, 
            yFill- amplitude * sin(TWO_PI * this.time / period + QUARTER_PI - omega), 
            barWidth, 
            yFill
        )
        vertex(barWidth, barHeight)
        vertex(0, barHeight)
        endShape(CLOSE)
    }

    private renderBubbles(): void {
        noStroke()
        fill(this.bubbles[0].color)
        for(let bubble of this.bubbles){
            circle(
                bubble.position.getX(),
                bubble.position.getY(),
                bubble.size
            )
        }
    }
}