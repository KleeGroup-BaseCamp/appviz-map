import * as p5 from "p5"
import {n3on} from "../../../neon"
import {Component, ComponentProps} from "../../../neon/core"
import {AnimationUtils, ColorUtils, PushPop} from "../../../neon/utils"


declare let drawingContext: CanvasRenderingContext2D // Duplicate (neonCircles) --> To declare globally

export interface SparkCircleProps extends ComponentProps{
    color?: p5.Color
}
export class SparkCircle extends Component{
    private readonly neonArc: NeonArc
    private readonly radius: number
    private readonly angleStep: number
    
    private readonly color: p5.Color = color(255)
    private readonly particles: (Spark | LineParticle)[] = []
  
    private angle:number = 0
  
    constructor(props: SparkCircleProps){
        super(props, "SparkCircle", false)
        this.color = ColorUtils.clone(props.color ?? color(255))
        this.radius = min(this.getWidth(), this.getHeight()) / 4
        this.angleStep = 10
        this.neonArc = new NeonArc(this.radius, this.angleStep, 2)
        this.neonArc.withColor(ColorUtils.clone(this.color))
        AnimationUtils.animate(0, 100, 5000, (s) => {this.update(s)})
    }

    @PushPop
    public render(): void{
        // Warning: Color displayed may vary a little than the one passed in withColor
        blendMode(DODGE) 
        translate(this.centerPosition) 
        stroke(255)
        this.particles.forEach(particle => particle.render())
        this.neonArc.render()
    }

    private update(progressPercent: number): void {
        const lastPos = this.buildPos(this.radius)
        this.angle += this.angleStep
        const pos = this.buildPos(this.radius)

        const vel = createVector(pos.x, pos.y)
        vel.sub(lastPos.x, lastPos.y)

        if(progressPercent < 98){
            this.particles.push(new LineParticle(pos, vel).withColor(this.color))
            this.particles.push(new Spark(pos, vel))
        }

        this.particles.forEach(
            particle => particle.update()
        )
        this.neonArc.update(progressPercent)
        for (let i = this.particles.length - 1; i > -1; i--){
            if(this.particles[i].isStopped())
                this.particles.splice(i, 1)
        }
    }

    private buildPos(radius: number): p5.Vector{
        return createVector(radius, 0)
            .rotate(radians(this.angle))
    }
}

class Spark{
    private readonly airDrag = 0.85 // TO DO : Proper handling of boundaries = f(angleStep, radius) 

    private pos: p5.Vector
    private vel: p5.Vector
    private lastPos: p5.Vector
    private strokeWeight: number = 3

    constructor(pos: p5.Vector, vel: p5.Vector){
        this.lastPos = pos
        this.pos = pos
        this.vel = vel
        this.vel.rotate(radians(random(-30, 30)))
    }

    @PushPop
    public render(): void{
        stroke(255)
        strokeWeight(this.strokeWeight)
        drawingContext.shadowColor = 'white'
        drawingContext.shadowBlur = 15
        line(this.lastPos.x, this.lastPos.y, this.pos.x, this.pos.y)
    }

    public update(): void{
        this.vel.mult(this.airDrag)
        this.lastPos = this.pos.copy()
        this.pos.add(this.vel)
        this.strokeWeight *= 0.95
    }

    public isStopped(): boolean{
        return this.vel.mag() < 0.05
    }
}

class LineParticle{
    private readonly startPos: p5.Vector
    private readonly vel: p5.Vector
    private readonly airDrag = 0.85 // TO DO : Proper handling of boundaries = f(angleStep, radius) 
    private color: p5.Color = color(255)
    private pos: p5.Vector

    constructor(startPos: p5.Vector, vel: p5.Vector){
        this.startPos = startPos.copy()
        this.pos = startPos.copy()
        this.vel = vel
        this.vel.rotate(radians(random(-20, 20)))
    }

    @PushPop
    public render(): void{
        const mass = this.vel.mag() * 3
        strokeWeight(mass)
        stroke(n3on.getStyle().color.back)
		drawingContext.shadowColor = this.color.toString()
		drawingContext.shadowBlur = 10
        line(this.startPos.x, this.startPos.y, this.pos.x, this.pos.y)
    }
    
    public update(): void{
        this.vel.mult(this.airDrag)
        this.pos.add(this.vel)
    }

    public isStopped(): boolean{
        return this.vel.mag() < 0.2
    }

    public withColor(color: p5.Color): LineParticle{
        this.color = ColorUtils.clone(color)
        return this
    }
}

class NeonArc{
    private readonly radius: number 
    private readonly strokeWeight: number
    private readonly angleStep: number
    private color: p5.Color = ColorUtils.clone(n3on.getStyle().color.a)
    private startAngle: number = 0 // Duplicate of angle in SparkCircle
    private endAngle: number = 0

    constructor(radius: number, angleStep: number, strokeWeight: number){
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
        arc(0, 0, this.radius * 2, this.radius * 2, this.startAngle, this.endAngle)
    }

    public update(s: number): void{
        const opacity = map(s, 0, 100, 0, 255)
        this.color.setAlpha(opacity)
        this.endAngle += radians(this.angleStep)
        const diff = map(s, 0, 100, 0, TWO_PI)
        this.startAngle = this.endAngle - diff
    }

    public withColor(color: p5.Color): NeonArc{
        this.color = ColorUtils.clone(color)
        return this
    }
}