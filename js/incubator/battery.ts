import * as p5 from "p5"
import {VElement} from "../core"
import {PxPosition, PxSize} from "../layout"
import {AnimationUtils} from "../utils"
import {style} from "../app"

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
            this.bubbles.push(new Bubble(0, barWidth, barHeight, 0, this.secondaryColor))
        }
        const duration = 3000 /*ms*/
        AnimationUtils.animate(0, percent, duration, (s:number) => this.percent = s)
        AnimationUtils.animate(50, 0, duration * 10, (s:number) => this.maxAmplitude = s)
        AnimationUtils.animate(0, 100, duration * 10, (s:number) => this.time = s)
        AnimationUtils.animate(0, 100, duration, s => this.bubbles.forEach(bubble => bubble.update(s)))
    }

    public render() : void {
        push()
        translate(this.padding, this.padding + this.topMargin)
        this.renderWaves()
        this.bubbles.forEach(bubble => bubble.render())        
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
}

class Bubble{
    private readonly xMin: number
    private readonly xMax: number
    private readonly yStart: number
    private readonly yEnd: number
    private readonly maxRadius = 5
    private readonly primaryColor: p5.Color
    private readonly secondaryColor: p5.Color = color(255)

    private x: number
    private y: number = 0
    private radius: number = this.maxRadius
    private color: p5.Color

    constructor(xMin: number, xMax: number, yStart: number, yEnd: number, primaryColor: p5.Color){
        this.xMin = xMin
        this.xMax = xMax
        this.yStart = yStart
        this.yEnd = yEnd
        const width = xMax - xMin
        this.x = xMin + width / 2 + random(width / 2) - width / 4
        this.primaryColor = primaryColor
        this.color = primaryColor
    }

    update(percent: number): void{
        this.y = this.yStart + (this.yEnd - this.yStart) * percent / 100
        this.radius = this.maxRadius * (1 - percent / 100)
        this.color = lerpColor(this.primaryColor, this.secondaryColor, percent / 100)
    }

    render(): void{
        noStroke()
        fill(this.color)
        circle(
            this.x,
            this.y,
            2 * this.radius
        )
    }
}