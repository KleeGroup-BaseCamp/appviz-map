import * as p5 from "p5";
import { style } from "../../app";
import { VElement } from "../../core";
import { PxSize } from "../../layout";
import { ColorUtils } from "../../utils";

export class NeonTrails extends VElement{
    private readonly trails: Trail[] = []

    private color: p5.Color = ColorUtils.clone(style.color.a)
    
    constructor(id: any, pxSize: PxSize){
        super(id, pxSize, false)
        this.trails.push(new Trail())
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
    private color: p5.Color = ColorUtils.clone(style.color.a)
    private history: p5.Vector[] = []

    constructor(){
        this.history = [createVector(-30,0), createVector(-15,-15), createVector(0,-30), createVector(15,-45)]
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
    }

    public update(progressPercent: number): void{

    }

    public withColor(color: p5.Color): Trail{
        this.color = color
        return this
    }
}
