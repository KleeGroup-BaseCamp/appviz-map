import {VElement} from "../core"
import {PxPosition, PxSize} from "../layout"
import {AnimationUtils} from "../utils"
import * as p5 from "p5"
import {Easings} from "../utils/easings"
import {BiColorGauge} from "./biColorGauge"

export class BlackHole4 extends VElement{
    private readonly primaryColor: p5.Color = color("RebeccaPurple")
    private readonly secondaryColor: p5.Color = color("HotPink")
    private readonly gauge: BiColorGauge

    private readonly radius: number
    private readonly weight: number
    private readonly centerPosition: PxPosition
    private readonly rays: Ray[] = []
    private readonly zMax: number
    
    private percent: number
    
    constructor(id: any, pxSize: PxSize, percent: number){
        super(id, pxSize, false)
        this.gauge = new BiColorGauge("-1", pxSize, percent)
        this.percent = percent
        this.weight = 5
        const margin = 10
        this.radius = (min(pxSize.getHeight(), pxSize.getWidth()) - this.weight - this.gauge.weight - margin) / 2
        this.centerPosition = new PxPosition(
            pxSize.getWidth() / 2, 
            pxSize.getHeight() / 2
            )
        const numOfRays = 200 // TODO: = f(percent)
        this.zMax = 4
        for(let i = 0; i < numOfRays; i++){
            const angle = random(TWO_PI)
            this.rays.push(
                new Ray(
                    this.radius * cos(angle), 
                    this.radius * sin(angle), 
                    random(1, this.zMax)
                )
            )
            
        }
        const duration = 3000 /*ms*/
        AnimationUtils.animate(
            0, 
            100, 
            duration, 
            (s:number) => {
                for(let i = 0; i < numOfRays; i++){
                    const z = s > 60 || this.rays[i].getZ() < this.zMax  // TO DO : change harcoded value (70)
                        ? this.rays[i].getZ() + 0.05 
                        : 1
                    this.rays[i].setZ(z)
                }
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
            ray.render(this.zMax, this.secondaryColor)
        }

        // Black Hole
        const numOfBlackHoleCircles = 20
        noStroke()
        for (let i = 0; i < numOfBlackHoleCircles; i++){
            const ratio = i / numOfBlackHoleCircles
            fill(0, 100 * (1 - ratio))
            circle(0, 0, 2 * this.radius * ratio)
        }
        pop()

        this.gauge.render()
    }

      
}


class Ray {
    private readonly x: number
    private readonly y: number
    private z: number

    constructor(x: number, y: number, z: number){
        this.x = x
        this.y = y
        this.z = z
    }

    public getX(): number{
        return this.x
    }

    public getY(): number{
        return this.y
    }

    public getZ(): number{
        return this.z
    }

    public setZ(z: number): void{
        this.z = z
    }

    public render(zMax: number, color: p5.Color): void{
        const pz = max(this.getZ() - 1, 1)
        if (pz > zMax) return

        const px = this.getX() / pz
        const py = this.getY() / pz
        
        const x = this.getX() / this.getZ()
        const y = this.getY() / this.getZ()
        
        color.setAlpha(200)
        strokeWeight(2)
        stroke(color)
        line(x, y, px, py)
    }
}