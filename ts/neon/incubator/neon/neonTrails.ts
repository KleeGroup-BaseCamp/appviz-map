import * as p5 from "p5";
import {style} from "../../../app";
import {VElement2, VElementProps} from "../../core";
import {AnimationUtils, ColorUtils, PushPop} from "../../utils";

declare let drawingContext: CanvasRenderingContext2D // Duplicate (all of neon files)

export class NeonTrails extends VElement2{
    private readonly trails: Trail[] = []
    private readonly neonArc: NeonArc
    
    constructor(props: VElementProps){
        super(props, false)
        const radius = min(this.getWidth(), this.getHeight()) / 4
        const numOfTrails = 10
        const angleStep = radians(10)
        for(let i = 0; i < numOfTrails; i++){
            this.trails.push(new Trail(radius, angleStep, i, numOfTrails))
        }
        this.neonArc = new NeonArc(radius, angleStep)
        AnimationUtils.animate(
            0, 
            100, 
            8000, 
            (s) => {
                this.trails.forEach(trail => trail.update(s))
                this.neonArc.update(s)
            }
        )
    }
    @PushPop
    public render(): void{
        translate(this.centerPosition.getX(), this.centerPosition.getY())
        this.trails.forEach(trail => trail.render())
        this.neonArc.render()
    }

    public withColor(color: p5.Color): NeonTrails{ // TO DO: extract theme from color ?
        this.trails.forEach(trail => trail.withColor(ColorUtils.clone(color)))
        this.neonArc.withColor(ColorUtils.clone(color))
        return this
    }
}

class Trail{
    private readonly radius: number
    private readonly angleStep: number

    private color: p5.Color = ColorUtils.clone(style.color.a)
    private history: p5.Vector[] = []
    private targetAngle: number

    constructor(radius: number, angleStep: number, trailIndex: number, numOfTrails: number){
        const origin = createVector(0, 0)
        this.history = [
            origin, 
            origin, 
            origin, 
            createVector(10, 0)
        ]
        this.radius = radius
        this.angleStep = angleStep
        this.targetAngle = trailIndex / numOfTrails * TWO_PI
    }
    @PushPop
    public render(): void{
        fill(this.color)
        const tail = this.history[0]
        const head = this.history[this.history.length - 1]
        let vertices: p5.Vector[] = [tail, tail]
        // Compute vertices
        for (let i = 1; i < this.history.length - 1; i++){
            const normal = this.history[i]
                .copy()
                .sub(this.history[i - 1])
                .rotate(HALF_PI)
                .normalize()
                .mult(i * 2)
            vertices.splice(
                i + 1, 
                0, 
                this.history[i]
                    .copy()
                    .add(normal),
                this.history[i]
                    .copy()
                    .sub(normal) 
            )
        }
        vertices.splice(this.history.length, 0, head)
        vertices.push(tail)
        vertices.push(tail)
        drawingContext.shadowColor = this.color.toString()
        drawingContext.shadowBlur = 15
        beginShape()
        vertices.forEach(vertex => curveVertex(vertex.x, vertex.y))
        endShape()
    }
        
    public update(progressPercent: number): void{
        const target = this.buildTarget(progressPercent)
        const newPos = this.buildNewPos(target)
        this.history.push(newPos)
        this.history.shift()

        const fadeOutStart = 70
        const opacity = map(
            max(progressPercent, fadeOutStart), 
            fadeOutStart, 
            100, 
            255, 
            0
        )
        this.color.setAlpha(opacity)
    }

    private buildTarget(progressPercent: number): p5.Vector{
        this.targetAngle += this.angleStep
        const ratio = progressPercent / 100
        return createVector(
            this.radius * cos(this.targetAngle) * random(ratio, 1),
            this.radius * sin(this.targetAngle) * random(ratio, 1)
        )
    }

    private buildNewPos(target: p5.Vector): p5.Vector{
        const pos = this.history[this.history.length - 1].copy()
        const vel = pos
            .copy()
            .sub(this.history[this.history.length - 2])
        // Rotate velocity to converge towards target
        const angle = target
            .copy()
            .sub(pos)
            .angleBetween(vel)
        vel.rotate(-angle * 0.3)
            .normalize()
            .mult(9)
        return pos.add(vel)
    }

    public withColor(color: p5.Color): Trail{
        this.color = ColorUtils.clone(color)
        return this
    }
}


class NeonArc{  // Duplicate (spark circle)
    private readonly radius: number 
    private readonly strokeWeight: number
    private readonly angleStep: number
    private color: p5.Color = ColorUtils.clone(style.color.a)
    private startAngle: number = 0
    private endAngle: number = 0

    constructor(radius: number, angleStep: number, strokeWeight: number = 2){
        this.radius = radius
        this.angleStep = angleStep
        this.strokeWeight = strokeWeight
    }
    @PushPop
    public render(): void{
        noFill()
        stroke(this.color)
        strokeWeight(this.strokeWeight)
        drawingContext.shadowColor = this.color.toString()
        drawingContext.shadowBlur = 15
        // Temporary solution, duplicating gives better neon effect
        arc(0, 0, this.radius * 2, this.radius * 2, this.startAngle, this.endAngle)
        arc(0, 0, this.radius * 2, this.radius * 2, this.startAngle, this.endAngle)
    }

    public update(s: number): void{
        const opacity = map(s, 0, 100, 0, 255)
        this.color.setAlpha(opacity)
        this.endAngle += this.angleStep
        const diff = map(s, 0, 100, 0, TWO_PI)
        this.startAngle = this.endAngle - diff
    }

    public withColor(color: p5.Color): NeonArc{
        this.color = ColorUtils.clone(color)
        return this
    }
}