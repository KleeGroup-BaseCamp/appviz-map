import * as p5 from "p5";
import { style } from "../app";
import { VElement } from "../core";
import { PxSize } from "../layout";
import { AnimationUtils } from "../utils";

declare let drawingContext: CanvasRenderingContext2D // Duplicate (neonCircles) --> To declare globally

export class ArcToCircle extends VElement{
    private startColor: p5.Color = style.color.a
    private endColor: p5.Color = style.color.c
    private color: p5.Color = style.color.a
    private blur: number = 0
    private startAngle: number = 0
    private endAngle: number = 0

    constructor(id: any, pxSize: PxSize){
        super(id, pxSize, false)
        AnimationUtils.animate(0, 100, 3000, (s) => {this.update(s)})
    }

    public render(): void{
        const radius = min(this.getWidth(), this.getHeight()) / 2 * 0.8
        noFill()
        stroke(this.color)
        strokeWeight(3)
        push()
        translate(this.getWidth() / 2, this.getHeight() / 2)
        drawingContext.shadowColor = this.color.toString();
        drawingContext.shadowBlur = this.blur 
        arc(0, 0, radius * 2, radius * 2, this.startAngle, this.endAngle)
        pop()
    }

    public update(s: number): void{
        const numOfLaps = 10
        const ratio = s / 100
        this.startAngle = ratio * numOfLaps * TWO_PI
        this.endAngle = this.startAngle + ratio * TWO_PI
        this.color = lerpColor(this.startColor, this.endColor, ratio)

        const blurPeak = 0.8
        const maxBlur = 15
        // 0 -> blurPeak: Increase blur --- blurPeak -> 100: Decrease blur
        this.blur = ratio <= blurPeak 
            ? (ratio / blurPeak) * maxBlur
            : ((1 - ratio) / (1 - blurPeak)) * maxBlur
    }

    public withColors(startColor: p5.Color, endColor: p5.Color): ArcToCircle{
        this.startColor = startColor
        this.endColor = endColor
        return this
    }
}