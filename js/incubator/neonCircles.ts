import * as p5 from "p5"
import {VElement} from "../core"
import {PxSize} from "../layout"
import {AnimationUtils} from "../utils"

declare let drawingContext: CanvasRenderingContext2D

export class NeonCircles extends VElement{
    private readonly primaryColor = color("Violet")
    private readonly secondaryColor = color("DeepSkyBlue")
    private readonly circles: NeonCircle[] = []

    constructor(id: any, pxSize: PxSize){
        super(id, pxSize, false)
        NeonCircle.primaryColor = this.primaryColor
        NeonCircle.secondaryColor = this.secondaryColor
        NeonCircle.maxRadius = min(this.getWidth(), this.getHeight()) / 2 * 0.8 // TO DO: estimate space taken by neon
        const numOfCircles = 5
        for(let i = 0; i < numOfCircles; i++){
            this.circles.push(new NeonCircle((i + 1) / numOfCircles * NeonCircle.maxRadius))
        }
        AnimationUtils.animate(
            0, 
            100, 
            2000, 
            (s) => {
                this.circles.forEach(
                    circle => circle.update(s)
                )
            }
        )
    }

    public render(): void{
        noFill()
        strokeWeight(2)
        push()
        translate(this.getWidth() / 2, this.getHeight() / 2)
        this.circles.forEach(
            circle => circle.render()
        )
        pop()
    }

    private renderNeonCircle(radius: number, color: p5.Color): void{
        push()
        stroke(color)
        drawingContext.shadowColor = color.toString();
        drawingContext.shadowBlur = 10 // TO DO: try different values for best visual
        circle(0, 0, 2 * radius)
        pop()
    }
}

class NeonCircle{
    static primaryColor: p5.Color // TO DO: éviter de changer les fields static pour chaque NeonCircles composant
    static secondaryColor: p5.Color
    static maxRadius: number
    private color: p5.Color = NeonCircle.primaryColor
    private radius: number
    private blur: number = 0

    constructor(radius: number){
        this.radius = radius
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
        const maxBlur = 15 // TO DO: try different values for best visual
        if(percent < firstAnimEnd){
            // 0 -> 70 converge radius & increase opacity & blur
            const finalRadius = NeonCircle.maxRadius / 2
            const ratio = percent / firstAnimEnd
            this.radius += ratio * (finalRadius - this.radius)
            lerpColor(NeonCircle.primaryColor, NeonCircle.secondaryColor, this.radius / NeonCircle.maxRadius)
            this.color.setAlpha(ratio * 255)
            this.blur = ratio * maxBlur
        } else{
            // 70 -> 100 decrease blur
            const ratio = (percent - firstAnimEnd) / (100 - firstAnimEnd)
            this.blur = (1 - ratio) * maxBlur
        }
    }

}