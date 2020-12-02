import * as p5 from "p5";
import { style } from "../../app";
import { VElement } from "../../core";
import { PxSize } from "../../layout";
import { AnimationUtils, ColorUtils } from "../../utils";

declare let drawingContext: CanvasRenderingContext2D // Duplicate (all of neon files)
export class NeonTrails extends VElement{
    private readonly trails: Trail[] = []
    private readonly neonArc: NeonArc

    private color: p5.Color = ColorUtils.clone(style.color.a)
    
    constructor(id: any, pxSize: PxSize){
        super(id, pxSize, false)
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

    public render(): void{
        push()
        translate(this.getWidth() / 2, this.getHeight() /2)
        this.trails.forEach(trail => trail.render())
        this.neonArc.render()
        pop()
    }

    public withColor(color: p5.Color): NeonTrails{ // TO DO: extract theme from color ?
        this.color = color
        this.trails.forEach(trail => trail.withColor(color))
        this.neonArc.withColor(color)
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
        push()
        drawingContext.shadowColor = this.color.toString()
        drawingContext.shadowBlur = 15
        beginShape()
        vertices.forEach(vertex => curveVertex(vertex.x, vertex.y))
        endShape()
        pop()
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
        this.color = color
        return this
    }
}


class NeonArc{  // Duplicate (spark circle)
    private readonly radius: number 
    private readonly strokeWeight: number
    private readonly angleStep: number
    private color: p5.Color = style.color.a
    private startAngle: number = 0
    private endAngle: number = 0

    constructor(radius: number, angleStep: number, strokeWeight: number = 2){
        this.radius = radius
        this.angleStep = angleStep
        this.strokeWeight = strokeWeight
    }

    public render(): void{
        noFill()
        stroke(this.color)
        strokeWeight(this.strokeWeight)
        push()
        drawingContext.shadowColor = this.color.toString()
        drawingContext.shadowBlur = 15
        // Temporary solution, duplicating gives better neon effect
        arc(0, 0, this.radius * 2, this.radius * 2, this.startAngle, this.endAngle)
        arc(0, 0, this.radius * 2, this.radius * 2, this.startAngle, this.endAngle)
        pop()
    }

    public update(s: number): void{
        const opacity = map(s, 0, 100, 0, 255)
        this.color.setAlpha(opacity)
        this.endAngle += this.angleStep
        const diff = map(s, 0, 100, 0, TWO_PI)
        this.startAngle = this.endAngle - diff
        console.log(this.startAngle, this.endAngle)
    }

    public withColor(color: p5.Color): NeonArc{
        this.color = color
        return this
    }
}