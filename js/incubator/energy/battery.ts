import * as p5 from "p5"
import {VElement} from "../../core"
import {AnimationUtils} from "../../utils"
import {style} from "../../app"
import {PxSize} from "../../layout"

export class Battery extends VElement{
    private readonly primaryColor: p5.Color =color("#32CD32")// Light green
    private readonly secondaryColor: p5.Color =color("#006400")// Dark green

    private readonly padding: number
    private readonly topMargin: number
    private readonly maxBubbleSize : number
    private readonly bubbles : Bubble[] = []
    private readonly waves : Wave[] = []

    private percent: number
    private maxAmplitude: number
    private time: number 

    constructor(id: any, pxSize: PxSize, percent: number){
        super(id, pxSize, false)
        this.percent = percent
        this.maxAmplitude = 0 
        this.time = 0
        this.maxBubbleSize = 8
        this.padding = 5
        this.topMargin = 10 // Margin for hat
        const barWidth = pxSize.getWidth() - 2 * this.padding
        const barHeight = pxSize.getHeight() - 2 * this.padding - this.topMargin
        const numOfBubbles = 1 
        for(let i = 0; i < numOfBubbles; i++){
            this.bubbles.push(new Bubble(0, barWidth, barHeight, 0, this.secondaryColor))
        }
        this.waves.push(new Wave(barHeight, barWidth, -QUARTER_PI, this.primaryColor, percent))
        this.waves.push(new Wave(barHeight, barWidth, QUARTER_PI, this.secondaryColor, percent))
        const duration = 3000 /*ms*/
        AnimationUtils.animate(0, 100, duration * 10, s => this.waves.forEach(wave => wave.update(s)))
        AnimationUtils.animate(0, 100, duration, s => this.bubbles.forEach(bubble => bubble.update(s)))
    }

    public render() : void {
        push()
        translate(this.padding, this.padding + this.topMargin)
        this.waves.forEach(wave => wave.render())
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
        this.y = this.yStart + (this.yEnd - this.yStart) * percent / 100 - this.radius
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


class Wave{
    private readonly barHeight: number
    private readonly barWidth: number
    private readonly omega: number
    private readonly color: p5.Color
    private readonly percent: number
    private maxAmplitude: number = 0
    private time: number = 0 // TO DO: Use better name
    private yFill: number = 0


    constructor(barHeight: number, barWidth: number, omega: number, color: p5.Color, percent: number){
        this.barHeight = barHeight
        this.barWidth = barWidth
        this.omega = omega
        this.color = color
        this.percent = percent
    }

    render(): void{
        const period = 15
        const fillHeight = this.barHeight - this.yFill 
        const amplitude = min(min(this.maxAmplitude, fillHeight), this.yFill) // bounding box constraints
        noStroke()
        fill(this.color)
        blendMode(LIGHTEST)
        beginShape()
        vertex(0, this.yFill)
        bezierVertex(
            this.barWidth / 3, 
            this.yFill- amplitude * sin(TWO_PI * this.time / period + QUARTER_PI + this.omega), 
            this.barWidth * 2 / 3, 
            this.yFill- amplitude * sin(TWO_PI * this.time / period + QUARTER_PI - this.omega), 
            this.barWidth, 
            this.yFill
        )
        vertex(this.barWidth, this.barHeight)
        vertex(0, this.barHeight)
        endShape(CLOSE)

    }

    update(s: number): void{
        const fillSpeedRatio = 3 // ration between fill animation speed and wave animation speed
        this.yFill = this.barHeight * (100 - min(s * fillSpeedRatio, this.percent)) / 100 // y coordinate of "liquid" surface
        this.time = s
        this.maxAmplitude = (100 - s) / 2
    }
}