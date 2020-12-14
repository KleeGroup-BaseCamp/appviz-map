import * as p5 from "p5"
import {Component, ComponentProps} from "../../../neon/core"
import {AnimationUtils, ColorUtils, PushPop} from "../../../neon/utils"
import {Easings} from "../../../neon/utils/easings"

declare let drawingContext: CanvasRenderingContext2D

export interface NeonCirclesProps extends ComponentProps{
    firstColor?: p5.Color,
    secondColor?: p5.Color
}

export class NeonCircles extends Component{
    private readonly firstColor
    private readonly secondColor
    private readonly circles: NeonCircle[] = []

    constructor(props: NeonCirclesProps){
        super(props, "NeonCircles", false)
        this.firstColor = ColorUtils.clone(props.firstColor ?? color("Violet"))
        this.secondColor = ColorUtils.clone(props.secondColor ?? color("DeepSkyBlue"))
        const numOfCircles = 5
        const maxRadius = min(this.getWidth(), this.getHeight()) / 2 * 0.8 // TO DO: estimate space taken by neon
        for(let i = 0; i < numOfCircles; i++){
            this.circles.push(
                new NeonCircle(
                    (i + 1) / numOfCircles * maxRadius, 
                    maxRadius, 
                    this.firstColor, 
                    this.secondColor
                )
            )
        }
        AnimationUtils.animate(
            0, 
            100, 
            2000, 
            (s) => {
                this.circles.forEach(
                    circle => circle.update(s)
                )
            },
            new Easings().linear
        )
    }
    @PushPop
    public render(): void{
        noFill()
        strokeWeight(2)
        translate(this.centerPosition)
        this.circles.forEach(
            circle => circle.render()
        )
    }
}

class NeonCircle{
    private readonly firstColor: p5.Color
    private readonly secondColor: p5.Color
    private readonly maxRadius: number
    private readonly startRadius: number
    private color: p5.Color
    private radius: number
    private blur: number = 0

    constructor(startRadius: number, maxRadius: number, firstColor: p5.Color, secondColor: p5.Color){
        this.startRadius = startRadius
        this.radius = startRadius
        this.maxRadius = maxRadius
        this.firstColor = firstColor
        this.secondColor = secondColor
        this.color = firstColor
    }

    public render(): void{
        push()
        stroke(this.color)
        drawingContext.shadowColor = this.color.toString();
        drawingContext.shadowBlur = this.blur 
        circle(0, 0, 2 * this.radius)
        pop()
    }

    public update(percent: number): void{
        const firstAnimEnd = 90
        const secondAnimStart = 80
        const secondAnimEnd = 85
        const maxBlur = 10 // TO DO: try different values for best visual
        if(percent < firstAnimEnd){
            // 0 -> firstAnimEnd: converge radius & increase opacity
            const finalRadius = this.maxRadius / 2
            const ratio = percent / firstAnimEnd
            this.radius = this.startRadius + ratio * (finalRadius - this.startRadius)
            this.color = lerpColor(this.firstColor, this.secondColor, this.radius / this.maxRadius)
            this.color.setAlpha(ratio * 255)
        } 
        if (percent >= secondAnimStart && percent < secondAnimEnd){
            // secondAnimStart -> SecondAnimEnd: increase blur
            const ratio = (percent - secondAnimStart) / (secondAnimEnd - secondAnimStart) 
            this.blur = ratio * maxBlur
        } 
        if(percent > secondAnimEnd){
            // secondAnimEnd -> 100: decrease blur
            const ratio = (percent - secondAnimEnd) / (100 - secondAnimEnd)
            this.blur = (1 - ratio) * maxBlur
        }
    }

}