import { VElement } from "../core";
import { PxPosition, PxSize } from "../layout";
import {AnimationUtils} from "../utils"
import {style} from "../app"

export class LoadingBarWithWaves extends VElement{


    private value: number
    private maxAmplitude: number
    private time: number // TO DO: Use better name

    private readonly maxBubbleSize
    private readonly numOfBubbles
    private readonly bubbleSizes: number[]
    private readonly bubblesPositions: PxPosition[]

    constructor(id: any, pxSize: PxSize, value: number){ // value -> intensity ?
        super(id, pxSize, false)
        this.value = value
        this.maxAmplitude = 0 
        this.time = 0
        this.maxBubbleSize = 8
        this.numOfBubbles = 5
        this.bubbleSizes = new Array(this.numOfBubbles).fill(0)
        this.bubblesPositions = new Array(this.numOfBubbles)
        for(let i = 0; i < this.numOfBubbles; i++){
            this.bubblesPositions[i] = new PxPosition(random(0, pxSize.getWidth()), 0)
        }

        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, value, duration, (s:number) => this.value = s)
        AnimationUtils.animate(30, 0, duration * 10, (s:number) => this.maxAmplitude = s)
        AnimationUtils.animate(0, 100, duration * 10, (s:number) => this.time = s)
        for(let i = 0; i < this.numOfBubbles; i++){
            AnimationUtils.animate(0, 100, duration * 3, (s:number) => this.bubbleSizes[i] = (1 - abs(50-s) / 50) * this.maxBubbleSize)
            AnimationUtils.animate(
                pxSize.getHeight(), 
                0, 
                duration * 3, 
                (s:number) => {
                    const bubbleSize = this.bubbleSizes[i]
                    const x = min(max(this.bubblesPositions[i].getX() + sin(s / (5 + i)), bubbleSize), pxSize.getWidth() - bubbleSize) // Bubble boundaries 
                    this.bubblesPositions[i] = new PxPosition(x, s)
                }
            )
        }
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

        // Render bubbles
        this.renderBubbles()

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

    private renderBubbles(){
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