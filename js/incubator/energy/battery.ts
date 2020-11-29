import * as p5 from "p5"
import {VElement} from "../../core"
import {AnimationUtils} from "../../utils"
import {style} from "../../app"
import {PxSize} from "../../layout"

export class Battery extends VElement{
    private readonly primaryColor: p5.Color =color("#32CD32")// Light green
    private readonly secondaryColor: p5.Color =color("#006400")// Dark green
    private readonly barWidth : number
    private readonly barHeight : number

    private readonly padding: number
    private readonly topMargin: number
    private readonly numOfBubbles : number = 15
    private readonly bubbles : Bubble[] = []
    private readonly waves : Wave[] = []

    constructor(id: any, pxSize: PxSize, percent: number){
        super(id, pxSize, false)
        this.padding = 5
        this.topMargin = 10 // Margin for hat
        this.barWidth = pxSize.getWidth() - 2 * this.padding
        this.barHeight = pxSize.getHeight() - 2 * this.padding - this.topMargin
        for(let i = 0; i < this.numOfBubbles; i++){
            this.bubbles[i]= this.createBubble()
        }
        const period = 15
        const maxAmplitude = 50
        this.waves.push(new Wave(this.barWidth, this.barHeight, -QUARTER_PI, this.primaryColor, period * 2, maxAmplitude / 2, percent))
        this.waves.push(new Wave(this.barWidth, this.barHeight, QUARTER_PI, this.secondaryColor, period, maxAmplitude, percent))
        const duration = 8000 /*ms*/
        AnimationUtils.animate(0, 100, duration, s => this.update(s))
    }

    private createBubble(): Bubble {
        return new Bubble(this.barWidth, this.barHeight)
    }

    private update (progressPercent : number){
        this.waves.forEach(wave => wave.update(progressPercent))
        for(let i = 0; i < this.bubbles.length; i++){
            const bubble = this.bubbles[i]
            bubble.update(progressPercent)
            if (! bubble.isAlive()){
                this.bubbles[i] = this.createBubble()
            }
        }
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
    private readonly maxRadius = 7

    private pos: p5.Vector
    private vel: p5.Vector
    private acc: p5.Vector
    private radius : number
    private color: p5.Color = color("#52ED52")
    private alive : boolean = true

    constructor(barWidth: number, barHeight: number){
        this.pos = createVector(random(barWidth), barHeight) 
        this.vel = createVector(0, 0) 
        this.acc = createVector(0, -random(barHeight)/frameRate()/100) 
        this.radius = 1
    }

    public update(progressPercent:number): void{
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.radius = min(this.maxRadius, this.radius + random (this.maxRadius/frameRate()))
        //this.color = lerpColor(this.primaryColor, this.secondaryColor, 1- pos.y / this;ba)
        this.alive = this.pos.y> (0 + this.radius) && progressPercent<100    
    }

    public isAlive():boolean {
        return this.alive
    }

    public render(): void{
        if (! this.alive) return
        noStroke()
        fill(this.color)
        circle(
            this.pos.x,
            this.pos.y,
            2 * this.radius
        )
    }
}


class Wave{
    private readonly barHeight: number
    private readonly barWidth: number
    private readonly omega: number
    private readonly color: p5.Color
    private readonly period: number
    private readonly percent: number
    private readonly maxAmplitude: number

    private amplitude: number = 0
    private time: number = 0 // TO DO: Use better name
    private yFill: number = 0


    constructor(barWidth: number, barHeight: number, omega: number, color: p5.Color, period: number, maxAmplitude: number, percent: number){
        this.barWidth = barWidth
        this.barHeight = barHeight
        this.omega = omega
        this.color = color
        this.period = period
        this.maxAmplitude = maxAmplitude
        this.percent = percent
    }

    public render(): void{
        const fillHeight = this.barHeight - this.yFill 
        const amplitude = min(min(this.amplitude, fillHeight), this.yFill) // bounding box constraints
        noStroke()
        fill(this.color)
        blendMode(LIGHTEST)
        beginShape()
        vertex(0, this.yFill)
        bezierVertex(
            this.barWidth / 3, 
            this.yFill- amplitude * sin(TWO_PI * this.time / this.period + QUARTER_PI + this.omega), 
            this.barWidth * 2 / 3, 
            this.yFill- amplitude * sin(TWO_PI * this.time / this.period + QUARTER_PI - this.omega), 
            this.barWidth, 
            this.yFill
        )
        vertex(this.barWidth, this.barHeight)
        vertex(0, this.barHeight)
        endShape(CLOSE)
    }

    public update(s: number): void{
        /*
        Filling animation is faster than wave animation -> Filling animation stops suddenly (reaches limit 
            before s = 100 -> no easeOutSine)
        Fixes: 
            - Filling animation duration = wave animation duration (not generally what we want:
                 filling fast and wave animation lasting)
            - Two separate animations with different durations & 2 separate update functions
        */
        const fillSpeedRatio = 3 // ration between fill animation speed and wave animation speed
        this.yFill = this.barHeight * (100 - min(s * fillSpeedRatio, this.percent)) / 100 // y coordinate of "liquid" surface
        this.amplitude = this.maxAmplitude * (100 - s) / 100
        this.time = s
    }
}