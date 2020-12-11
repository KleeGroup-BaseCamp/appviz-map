import * as p5 from "p5"
import {Component, ComponentProps} from "../../core"
import {AnimationUtils, ColorUtils, PushPop} from "../../utils"

declare let drawingContext: CanvasRenderingContext2D // Duplicate (neonCircles) --> To declare globally

export interface ArcToCircleProps extends ComponentProps{
    startColor?: p5.Color,
    endColor?: p5.Color
}

export class ArcToCircle extends Component{
    private readonly startColor: p5.Color
    private readonly endColor: p5.Color

    private color: p5.Color = ColorUtils.clone(this.style.color.a)
    private blur: number = 0
    private radius: number = 0
    private vStrokeWeight: number = 0
    private startAngle: number = 0
    private endAngle: number = 0

    constructor(props: ArcToCircleProps){
        super(props, "ArcToCircle", false)
        this.startColor = ColorUtils.clone(props.startColor ?? this.style.color.a)
        this.endColor = ColorUtils.clone(props.endColor ?? props.startColor ?? this.style.color.a)
        AnimationUtils.animate(0, 100, 5000, (s) => {this.update(s)})
    }
    @PushPop
    public render(): void{
        noFill()
        stroke(this.color)
        strokeWeight(this.vStrokeWeight)
        translate(this.centerPosition) 
        drawingContext.shadowColor = this.color.toString();
        drawingContext.shadowBlur = this.blur 
        arc(0, 0, this.radius * 2, this.radius * 2, this.startAngle, this.endAngle)
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
}

