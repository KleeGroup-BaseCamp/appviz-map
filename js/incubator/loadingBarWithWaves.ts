import { VElement } from "../core";
import { PxPosition, PxSize } from "../layout";
import {AnimationUtils} from "../utils"
import {style} from "../app"
import * as p5 from "p5";

type Bubble = {
    id : number,
    size: number,
    position: PxPosition
}

export class LoadingBarWithWaves extends VElement{
    private readonly primaryColor: p5.Color =color("#32CD32")// Light green
    private readonly secondaryColor: p5.Color =color("#006400")// Dark green
    private readonly padding: number
    private readonly maxBubbleSize : number
    private readonly bubbles : Bubble[] = []

    private value: number
    private maxAmplitude: number
    private time: number // TO DO: Use better name
    private xOff: number // x coordinate in noise (Perlin) space 

    constructor(id: any, pxSize: PxSize, value: number){ // value -> intensity ?
        super(id, pxSize, false)
        this.value = value
        this.maxAmplitude = 0 
        this.time = 0
        this.xOff = 0
        this.maxBubbleSize = 8
        this.padding = 5
        const numOfBubbles = 5 
        for(let i = 0; i < numOfBubbles; i++){
            this.bubbles.push({
                id : i,
                size : 0,
                position :  new PxPosition(random(this.padding, pxSize.getWidth() - this.padding), 0)
            })
        }
        
        const duration = 3000 /*ms*/
        AnimationUtils.animate(0, value, duration, (s:number) => this.value = s)
        AnimationUtils.animate(50, 0, duration * 10, (s:number) => this.maxAmplitude = s)
        AnimationUtils.animate(0, 100, duration * 10, (s:number) => this.time = s)

        for(let bubble of this.bubbles){
            AnimationUtils.animate(0, 100, duration * 3, (s:number) => bubble.size = (1 - abs(50-s) / 50) * this.maxBubbleSize)
            AnimationUtils.animate(
                pxSize.getHeight(), 
                0, 
                duration * 3, 
                (s:number) => {
                    this.xOff + 0.01
                    const x = min(
                        max(
                            bubble.position.getX() + sin(s / (5 + bubble.id)) + 2 * (noise(this.xOff) - 0.5), 
                            bubble.size + this.padding
                        ), 
                        pxSize.getWidth() - this.padding - bubble.size
                    ) // Bubble boundaries 
                    bubble.position = new PxPosition(x, s)
                }
            )
        }
    }

    public render() : void {

        push()
        translate(this.padding, this.padding)
        //Render waves
        this.renderWaves()

        // Render bubbles
        this.renderBubbles()
        pop()

        // Render container
        noFill()
        const weight = 2
        strokeWeight(this.padding)
        stroke(style.color.back)
        rect(
            this.padding / 2, 
            this.padding / 2, 
            this.getPxSize().getWidth() - this.padding, 
            this.getPxSize().getHeight() - this.padding, 
            15
        )

        strokeWeight(weight)
        stroke(style.text.color.primary)
        rect(0,0, this.getPxSize().getWidth(), this.getPxSize().getHeight(), 15)
    }
    /**
     * 
     * @param yFill y coordinate of "liquid" surface
     * @param barWidth With of bar/container
     */
    private renderWaves(): void{
        const barHeight = this.getPxSize().getHeight() - this.padding * 2
        const barWidth = this.getPxSize().getWidth() - this.padding * 2
        const yFill = barHeight * (1 - this.value / 100) // y coordinate of "liquid" surface

        const period = 15
        const fillHeight = barHeight - yFill 
        const amplitude = min(min(this.maxAmplitude, fillHeight), yFill) // bounding box constraints

        noStroke()
        // First wave
        // stroke(this.secondaryColor)
        fill(this.secondaryColor)
        blendMode(LIGHTEST);
        this.renderWave(yFill, barWidth, barHeight, amplitude, period, QUARTER_PI) 

        // Second wave
        // stroke(this.primaryColor)
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
        fill("white")
        for(let bubble of this.bubbles){
            circle(
                bubble.position.getX(),
                bubble.position.getY(),
                bubble.size
            )
        }
    }
}