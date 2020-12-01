import {VElement} from "../core"
import {PxSize} from "../layout"
import {AnimationUtils} from "../utils"
import * as p5 from "p5"
import {Easings} from "../utils/easings"
import {Gauge} from "./gauge/gauge"

export class BlackHole4 extends VElement{
    private readonly primaryColor: p5.Color = color("RebeccaPurple")
    private readonly secondaryColor: p5.Color = color("HotPink")
    private readonly gauge: Gauge

    private readonly radius: number
    private readonly weight: number
    private readonly rays: Ray[] = []
    private readonly light: OpacityOutCircle
    private readonly hole: OpacityOutCircle
    
    constructor(id: any, pxSize: PxSize, percent: number){
        super(id, pxSize, false)
        this.gauge = new Gauge("-1", pxSize, percent)
        this.weight = 5
        const margin = 10
        this.radius = (min(pxSize.getHeight(), pxSize.getWidth()) - this.weight - this.gauge.weight - margin) / 2
        this.light = new OpacityOutCircle(color(255, 225, 0), 0, this.radius * percent / 100, 70, 100)
        this.hole = new OpacityOutCircle(color(0), this.radius, 0, 20, 100)
        const numOfRays = 200 // TODO: = f(percent)
        for(let i = 0; i < numOfRays; i++){
            this.rays.push(new Ray(this.radius))
        }
        const duration = 3000 /*ms*/
        AnimationUtils.animate(
            0, 
            100, 
            duration, 
            (s:number) => {
                this.hole.update(s)
                this.light.update(s)
                this.rays.forEach(ray=>ray.update(s))
            },
            new Easings().linear
        ) 
    }
                
    public render() : void {
        push()
        translate(this.centerPosition.getX(), this.centerPosition.getY())
        fill(this.primaryColor)
        strokeWeight(2)
        stroke(this.secondaryColor)
        circle(0, 0, 2 * this.radius)

        // Gradient stroke
        const numOfStrokeCircles = 5
        const weight = 5
        noFill()
        this.secondaryColor.setAlpha(100)
        stroke(this.secondaryColor)
        for(let i = 0; i < numOfStrokeCircles; i++){
            const ratio = i / numOfStrokeCircles
            stroke(lerpColor(this.primaryColor, this.secondaryColor, ratio))
            circle(0, 0, 2 * this.radius - weight * (1 - ratio))
        }

        // Trails
        for(let ray of this.rays){
            ray.render(this.secondaryColor)
        }

        this.hole.render()
        this.light.render()
        pop()

        this.gauge.render()
    }    
}

/**
 * Circle with color opacity decreasing linearly from 255 at center to 0 at radius
 */
class OpacityOutCircle { 
    private readonly color: p5.Color
    private readonly startRadius: number
    private readonly endRadius: number
    private readonly startAnimPercent: number
    private readonly endAnimPercent: number
    private radius: number = 0

    constructor(color: p5.Color, startRadius: number, endRadius: number, startAnimPercent: number, endAnimPercent: number){
        this.color = color
        this.startRadius = startRadius
        this.endRadius = endRadius
        this.startAnimPercent = startAnimPercent
        this.endAnimPercent = endAnimPercent
    }

    public update(progressPercent: number){
        const diffRadius = this.endRadius - this.startRadius
        const diffAnimation = this.endAnimPercent - this.startAnimPercent
        const animationRatio = min(max(progressPercent - this.startAnimPercent, 0) / (diffAnimation), 1)
        this.radius = this.startRadius + diffRadius * animationRatio
    }

    public render(){
        noStroke()
        const numOfCircles = 30
        for (let i = 0; i < numOfCircles; i++){
            const ratio = i / numOfCircles
            this.color.setAlpha(255 * (1 - ratio))
            fill(this.color)
            circle(0,0, 2 * this.radius * ratio)
        }
    }
}


class Ray {
    private readonly zMax: number = 4
    private readonly x: number
    private readonly y: number
    private z: number

    constructor(radius: number){
        const angle = random(TWO_PI)
        this.x = radius * cos(angle), 
        this.y = radius * sin(angle), 
        this.z = random(1, this.zMax)
    }

    public update (progressPercent: number){
        this.z= progressPercent > 40 || this.z < this.zMax  
        ? this.z + 0.1 
        : 1
    }

    public setZ(z: number): void{
        this.z = z
    }

    public render( color: p5.Color): void{
        const pz = max(this.z - 1, 1)
        if (pz > this.zMax) return

        const px = this.x / pz
        const py = this.y / pz
        
        const x = this.x / this.z
        const y = this.y / this.z
        
        color.setAlpha(200)
        strokeWeight(2)
        stroke(color)
        line(x, y, px, py)
    }
}