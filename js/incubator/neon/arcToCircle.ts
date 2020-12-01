import * as p5 from "p5"
import {style} from "../../app"
import {VElement} from "../../core"
import {PxSize} from "../../layout"
import {AnimationUtils, ColorUtils} from "../../utils"

declare let drawingContext: CanvasRenderingContext2D // Duplicate (neonCircles) --> To declare globally

export class ArcToCircle extends VElement{
    private startColor: p5.Color = ColorUtils.clone(style.color.a)
    private endColor: p5.Color = ColorUtils.clone(style.color.c)
    private color: p5.Color = ColorUtils.clone(style.color.a)
    private blur: number = 0
    private radius: number = 0
    private vStrokeWeight: number = 0
    private startAngle: number = 0
    private endAngle: number = 0

    constructor(id: any, pxSize: PxSize){
        super(id, pxSize, false)
        AnimationUtils.animate(0, 100, 5000, (s) => {this.update(s)})
    }

    public render(): void{
        noFill()
        stroke(this.color)
        strokeWeight(this.vStrokeWeight)
        push()
        translate(this.getWidth() / 2, this.getHeight() / 2)
        drawingContext.shadowColor = this.color.toString();
        drawingContext.shadowBlur = this.blur 
        arc(0, 0, this.radius * 2, this.radius * 2, this.startAngle, this.endAngle)
        pop()
    }

    public update(s: number): void{
        const ratio = s / 100
        this.startAngle = ratio * s * TWO_PI / 3
        this.endAngle = this.startAngle + ratio * TWO_PI
        this.color = lerpColor(this.startColor, this.endColor, ratio)

        const blurPeak = 0.9
        const maxBlur = 15
        // 0 -> blurPeak: Increase blur --- blurPeak -> 100: Decrease blur
        this.blur = ratio <= blurPeak 
            ? (ratio / blurPeak) * maxBlur
            : ((1 - ratio) / (1 - blurPeak)) * maxBlur
        
        const maxRadius = min(this.getWidth(), this.getHeight()) / 2 * 0.85 // TO DO: estimate space taken by neon
        this.radius = ratio * maxRadius 

        const maxStrokeWeight = 4
        this.vStrokeWeight = ratio * maxStrokeWeight
    }

    public withColors(startColor: p5.Color, endColor: p5.Color): ArcToCircle{
        this.startColor = startColor
        this.endColor = endColor
        return this
    }
}

