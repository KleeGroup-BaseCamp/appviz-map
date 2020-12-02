import * as p5 from "p5";
import { style } from "../../app";
import { VElement } from "../../core";
import { PxSize } from "../../layout";
import { AnimationUtils, ColorUtils } from "../../utils";

export class NeonTrails extends VElement{
    private readonly trails: Trail[] = []

    private color: p5.Color = ColorUtils.clone(style.color.a)
    
    constructor(id: any, pxSize: PxSize){
        super(id, pxSize, false)
        const radius = min(this.getWidth(), this.getHeight()) / 2
        const numOfTrails = 5
        for(let i = 0; i < numOfTrails; i++){
            this.trails.push(new Trail(radius * 0.5))
        }
        AnimationUtils.animate(
            0, 
            100, 
            8000, 
            (s) => this.trails.forEach(trail => trail.update(s))
        )
    }

    public render(): void{
        push()
        translate(this.getWidth() / 2, this.getHeight() /2)
        this.trails.forEach(trail => trail.render())
        pop()
    }

    public withColor(color: p5.Color): NeonTrails{ // TO DO: extract theme from color ?
        this.color = color
        this.trails.forEach(trail => trail.withColor(color))
        return this
    }
}

class Trail{
    private readonly radius: number

    private color: p5.Color = ColorUtils.clone(style.color.a)
    private history: p5.Vector[] = []
    private targetAngle: number = random(0, TWO_PI)

    constructor(radius: number){

        const origin = createVector(0, 0)
        this.history = [
            origin, 
            origin, 
            origin, 
            createVector(10, 0)
        ]
        this.radius = radius
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
        beginShape()
        vertices.forEach(vertex => curveVertex(vertex.x, vertex.y))
        endShape()

        // Drawing targets for debugging (duplicate var in update) (TO DO: remove or make better visual)
        const target = createVector(
            this.radius * cos(this.targetAngle),
            this.radius * sin(this.targetAngle)
        )
        push()
        stroke(255)
        strokeWeight(4)
        point(target.x, target.y)
        pop()
    }
        
    public update(progressPercent: number): void{
        const historyLength = 4
        const pos = this.history[historyLength - 1].copy()
        const angleStep = radians(10)
        this.targetAngle += angleStep
        const target = createVector(
            this.radius * cos(this.targetAngle),
            this.radius * sin(this.targetAngle)
        )
        const vel = pos
            .copy()
            .sub(this.history[historyLength - 2])
        // Rotate velocity to converge towards target
        const angle = target
            .copy()
            .sub(pos)
            .angleBetween(vel)
        vel.rotate(-angle * 0.3)
            .normalize()
            .mult(10)
        this.history.push(pos.add(vel))
        this.history.shift()
    }

    public withColor(color: p5.Color): Trail{
        this.color = color
        return this
    }
}
