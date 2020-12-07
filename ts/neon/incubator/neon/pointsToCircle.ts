import * as p5 from "p5"
import {VElement, VElementProps} from "../../core"
import {Easings} from "../../utils/easings"
import {AnimationUtils, PushPop} from "../../utils"

declare let drawingContext: CanvasRenderingContext2D // Duplicate (neonCircles) --> To declare globally

export class PointsToCircle extends VElement{
    private readonly points: NeonPoint[] = []
    private readonly neonCircle: NeonCircle

    constructor(props: VElementProps){
        super(props, false)
        const numOfPoints = 30
        const maxRadius = min(this.getWidth(), this.getHeight()) / 2 * 0.75 // TO DO: estimate space taken by neon
        for(let i = 0; i < numOfPoints; i++){
            this.points.push(new NeonPoint(maxRadius, random(TWO_PI), random(maxRadius/2, maxRadius)))
        }
        this.neonCircle = new NeonCircle(maxRadius, color("DeepSkyBlue"), 4, 15)
        AnimationUtils.animate(0, 100, 5000, s=>this.update(s))
        AnimationUtils.animate(0, 100, 5000, s=>this.neonCircle.update(s), new Easings().easeInQuad)
    }

    private update(percent :number): void{
        this.points.forEach(
            point => point.update(percent)
        )
    }    
    @PushPop
    public render(): void{
        translate(this.getWidth() / 2, this.getHeight() / 2)
        this.points.forEach(
            point => point.render()
        )
        this.neonCircle.render()
    }
}



class NeonPoint{
    private readonly maxDistance: number
    private readonly startAngle: number
    private readonly startDistance: number
    private distance: number = 0
    private angle: number = 0
    private radius: number = 0

    constructor(maxDistance: number, startAngle: number, startDistance: number){
        this.maxDistance = maxDistance
        this.startAngle = startAngle
        this.startDistance = startDistance
    }
    @PushPop
    public render(){
        noFill()
        const vColor = color("DeepSkyBlue") // TODO: Pass color as prop/arg
        fill(vColor)
        strokeWeight(2)
        stroke(vColor)
        drawingContext.shadowColor = vColor.toString();
        drawingContext.shadowBlur = 15
        circle( // Filled circle renders better than point
            this.distance * cos(this.angle), 
            this.distance * sin(this.angle),
            this.radius
        ) 
    }

    public update(s: number){
        this.distance = map(s, 0, 100, this.startDistance, this.maxDistance) 

        const maxNumOfLaps = 30
        this.angle = this.startAngle + random(maxNumOfLaps * TWO_PI * s/100)

        this.radius = map(s, 0, 100, 5, 0)
    }
}


export class NeonCircle{
    private readonly radius: number 
    private readonly blur: number
    private readonly color: p5.Color
    private readonly strokeWeight: number

    constructor(radius: number, color: p5.Color, strokeWeight: number, blur: number = 15){
        this.radius = radius
        this.color = color
        this.strokeWeight = strokeWeight
        this.blur = blur
    }
    
    @PushPop
    public render(): void{
        noFill()
        stroke(this.color)
        strokeWeight(this.strokeWeight)
        drawingContext.shadowColor = this.color.toString()
        drawingContext.shadowBlur = this.blur 
        circle(0, 0, this.radius * 2)
    }

    public update(s: number): void{
        const opacity = map(s, 0, 100, 0, 255)
        this.color.setAlpha(opacity)
    }
}