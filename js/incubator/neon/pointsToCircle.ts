import {VElement} from "../../core"
import {PxSize} from "../../layout"
import {AnimationUtils} from "../../utils"

declare let drawingContext: CanvasRenderingContext2D // Duplicate (neonCircles) --> To declare globally

export class PointsToCircle extends VElement{
    private readonly points: NeonPoint[] = []

    constructor(id: any, pxSize: PxSize){
        super(id, pxSize, false)
        const numOfPoints = 30
        const maxRadius = min(this.getWidth(), this.getHeight()) / 2 * 0.8 // TO DO: estimate space taken by neon
        for(let i = 0; i < numOfPoints; i++){
            this.points.push(new NeonPoint(maxRadius, random(TWO_PI), random(maxRadius)))
        }
        AnimationUtils.animate(0, 100, 5000, s=>this.update(s))
    }

    private update(percent :number): void{
        this.points.forEach(
            point => point.update(percent)
        )
    }    

    public render(): void{
        push()
        translate(this.getWidth() / 2, this.getHeight() / 2)
        this.points.forEach(
            point => point.render()
        )
        pop()
    }
}



class NeonPoint{
    private readonly maxDistance: number
    private readonly startAngle: number
    private readonly startDistance: number
    private distance: number = 0
    private angle: number = 0

    constructor(maxDistance: number, startAngle: number, startDistance: number){
        this.maxDistance = maxDistance
        this.startAngle = startAngle
        this.startDistance = startDistance
    }

    render(){
        noFill()
        const vColor = color("DeepSkyBlue")
        fill(vColor)
        strokeWeight(2)
        stroke(vColor)
        push()
        drawingContext.shadowColor = vColor.toString();
        drawingContext.shadowBlur = 15
        circle( // Filled circle renders better than point
            this.distance * cos(this.angle), 
            this.distance * sin(this.angle),
            5
        ) 
        pop()
    }

    update(s: number){
        const ratio = s / 100
        this.distance = this.startDistance + (this.maxDistance - this.startDistance) * ratio

        const maxNumOfLaps = 30
        this.angle = this.startAngle + random(maxNumOfLaps * TWO_PI * ratio)
    }
}