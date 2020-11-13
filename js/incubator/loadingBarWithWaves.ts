import { VElement } from "../core";
import { PxPosition, PxSize } from "../layout";
import {AnimationUtils} from "../utils"
import {style} from "../app"
import * as p5 from "p5";

export class LoadingBarWithWaves extends VElement{


    private value: number
    private maxAmplitude: number
    private time: number // TO DO: Use better name
    private xOff: number // x coordinate in noise (Perlin) space 
    private readonly maxBubbleSize
    private readonly numOfBubbles
    private readonly bubbleSizes: number[]
    private readonly bubblesPositions: PxPosition[]
    private readonly primaryColor: p5.Color // Light green
    private readonly secondaryColor: p5.Color // Dark green

    constructor(id: any, pxSize: PxSize, value: number){ // value -> intensity ?
        super(id, pxSize, false)
        this.value = value
        this.maxAmplitude = 0 
        this.time = 0
        this.xOff = 0
        this.maxBubbleSize = 8
        this.numOfBubbles = 5
        this.primaryColor = color("#32CD32")
        this.secondaryColor = color("#006400")
        this.bubbleSizes = new Array(this.numOfBubbles).fill(0)
        this.bubblesPositions = new Array(this.numOfBubbles)
        for(let i = 0; i < this.numOfBubbles; i++){
            this.bubblesPositions[i] = new PxPosition(random(0, pxSize.getWidth()), 0)
        }

        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, value, duration, (s:number) => this.value = s)
        AnimationUtils.animate(50, 0, duration * 10, (s:number) => this.maxAmplitude = s)
        AnimationUtils.animate(0, 100, duration * 10, (s:number) => this.time = s)
        for(let i = 0; i < this.numOfBubbles; i++){
            AnimationUtils.animate(0, 100, duration * 3, (s:number) => this.bubbleSizes[i] = (1 - abs(50-s) / 50) * this.maxBubbleSize)
            AnimationUtils.animate(
                pxSize.getHeight(), 
                0, 
                duration * 3, 
                (s:number) => {
                    const bubbleSize = this.bubbleSizes[i]
                    this.xOff + 0.01
                    const x = min(
                        max(
                            this.bubblesPositions[i].getX() + sin(s / (5 + i)) + 2 * (noise(this.xOff) - 0.5), 
                            bubbleSize
                        ), 
                        pxSize.getWidth() - bubbleSize
                    ) // Bubble boundaries 
                    this.bubblesPositions[i] = new PxPosition(x, s)
                }
            )
        }
    }

    public render() : void {
        const barHeight = this.getPxSize().getHeight()
        const barWidth = this.getPxSize().getWidth()
        const yFill = barHeight * (1 - this.value / 100) // y coordinate of "liquid" surface

        //Render wave
        this.renderWave(yFill, barWidth)

        //Render "liquid"
        strokeJoin(ROUND)
        strokeWeight(2)
        noStroke()
        // rect(0, yFill, barWidth, barHeight - yFill)
        for(let i = 0; i < this.getPxSize().getHeight() - yFill; i++){
            stroke(lerpColor(color("#32CD32"), color("#006400"), i / barHeight))
            line(0, yFill + i, barWidth, yFill + i)
        }

        // Render bubbles
        this.renderBubbles()

        // Render Bar/container
        noFill()
        strokeWeight(2)
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
        
        translate(0, yFill)
        const period = 10
        const fillHeight = this.getPxSize().getHeight() - yFill 
        const amplitude = min(min(this.maxAmplitude, fillHeight), yFill) // bounding box constraints

        stroke(this.secondaryColor)
        fill(this.secondaryColor)
        // First wave
        beginShape()
        vertex(0, 0)
        bezierVertex(
            barWidth / 3, 
            - amplitude * sin(TWO_PI * this.time / period + HALF_PI), 
            barWidth * 2 / 3, 
            - amplitude * sin(TWO_PI * this.time / period), 
            barWidth, 
            0
        )
        endShape()
        
        stroke(this.primaryColor)
        fill(this.primaryColor)
        // Second wave
        beginShape()
        vertex(0, 0)
        bezierVertex(
            barWidth / 3, 
            - (amplitude / 2)* sin(TWO_PI * this.time / period), 
            barWidth * 2 / 3, 
            - (amplitude / 2) * sin(TWO_PI * this.time / period + HALF_PI), 
            barWidth, 
            0
        )
        endShape()
        pop()
    }

    private renderBubbles(){
        noStroke()
        fill("white")
        for(let i = 0; i < this.numOfBubbles; i++){
            circle(
                this.bubblesPositions[i].getX(),
                this.bubblesPositions[i].getY(),
                this.bubbleSizes[i]
            )
        }
    }
}