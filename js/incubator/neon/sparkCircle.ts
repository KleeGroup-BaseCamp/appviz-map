import * as p5 from "p5";
import {VElement} from "../../core"
import { PxSize } from "../../layout";
import { AnimationUtils } from "../../utils";

export class SparkCircle extends VElement{
    private angle = 0
    private sparks: Spark[] = []

    constructor(id: any, pxSize: PxSize){
        super(id, pxSize, false)
        AnimationUtils.animate(0, 100, 10000, () => {this.update()})
    }

    public render(): void{
        push()
        translate(this.getWidth() / 2, this.getHeight() / 2)
        stroke(255)
        // circle(0, 0, min(this.getWidth(), this.getHeight()) / 2)
        this.sparks.forEach(spark => spark.render())
        pop()
    }

    private update(): void {
        const angleRate = 10
        const radius = min(this.getWidth(), this.getHeight()) / 4
        const lastPos = this.computePos(radius)
        this.angle += angleRate
        const pos = this.computePos(radius)

        const vel = createVector(pos.x, pos.y)
        vel.sub(lastPos.x, lastPos.y)

        for(let i = 0; i < 1; i++){
            this.sparks.push(new Spark(pos, vel))
        }
        this.sparks.forEach(
            spark => {
                spark.update()
            }
        )
        for (let i = this.sparks.length - 1; i > -1; i--){
            if(this.sparks[i].isStopped())
                this.sparks.splice(i, 1)
        }
        // console.log(this.sparks.length)
    }

    private computePos(radius: number): p5.Vector{
        const vect = createVector(radius, 0)
        vect.rotate(radians(this.angle))
        return vect
    }
}

class Spark{
    private pos: p5.Vector
    private vel: p5.Vector
    private lastPos: p5.Vector

    constructor(pos: p5.Vector, vel: p5.Vector){
        this.lastPos = pos
        this.pos = pos
        this.vel = vel
    }

    public render(): void{
        // TO DO: add blur ?
        stroke(255)
        line(this.lastPos.x, this.lastPos.y, this.pos.x, this.pos.y)
    }

    public update(): void{
        this.vel.mult(0.85)
        this.lastPos = this.pos
        this.pos.add(this.vel)
    }

    public isStopped(): boolean{
        return this.vel.mag() < 0.2
    }
}