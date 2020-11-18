import {VElement} from "../core"
import {PxPosition, PxSize} from "../layout"
import {AnimationUtils} from "../utils"
import * as p5 from "p5"
import { Easings } from "../utils/easings"
import { ContinuousCircularProgressBar } from "./continuousCircularProgressBar"

type Trail = {
    start: number,
    end: number,
    angle: number,
    delay: number
}

export class BlackHole extends VElement{
    private readonly primaryColor: p5.Color = color("RebeccaPurple")
    private readonly secondaryColor: p5.Color = color("HotPink")
    private readonly progressBar: ContinuousCircularProgressBar

    private readonly radius: number
    private readonly weight: number
    private readonly centerPosition: PxPosition
    private readonly trails: Trail[] = []
    
    private percent: number
    
    constructor(id: any, pxSize: PxSize, percent: number){
        super(id, pxSize, false)
        this.progressBar = new ContinuousCircularProgressBar("-1", pxSize, percent)
        this.percent = percent
        this.weight = 5
        const margin = 10
        this.radius = (min(pxSize.getHeight(), pxSize.getWidth()) - this.weight - this.progressBar.weight - margin) / 2
        this.centerPosition = new PxPosition(
            pxSize.getWidth() / 2, 
            pxSize.getHeight() / 2
            )
        const numOfTrails = 100 // TODO: = f(percent)
        const maxDelay = 2000 // (ms) Max delay before last trail animation starts
        for(let i = 0; i < numOfTrails; i++){
            this.trails.push({
                start: this.radius,
                end: this.radius,
                angle: random() * TWO_PI,
                delay: 0 // TO DO: random() * maxDelay
            })
            
            const duration = 1500 /*ms*/
            setTimeout(
                () => 
                    AnimationUtils.animate(
                        this.radius, 
                        0, 
                        duration, 
                        (s:number) => {
                            this.trails[i].start = s
                            this.trails[i].end = min(this.radius, s * 3 )
                        }, 
                        new Easings().easeInQuad
                    ),
                random() * maxDelay
            )
        }
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
        for(let trail of this.trails){
            this.drawTrail(trail.start, trail.end, trail.angle)
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

        this.progressBar.render()
    }

    private drawTrail(start: number, end: number, angle: number): void{
        // const numOfPoints = 15 // TO DO: = f(end,start)
        // const maxRadius = 3
        // const minRadius = 2
        // noStroke()
        // for(let i = 0; i < numOfPoints; i++){
            //     const ratio = i / numOfPoints
            //     this.secondaryColor.setAlpha(ratio * 200)
            //     fill(this.secondaryColor)
            //     const r = start + ratio * diff
            //     circle(r * cos(angle), r * sin(angle), min(max(ratio * maxRadius, minRadius), this.radius - r))
            // }
        this.secondaryColor.setAlpha(150)
        strokeWeight(2)
        stroke(this.secondaryColor)
        line(start * cos(angle), start * sin(angle), end * cos(angle), end * sin(angle))
        const numOfLines = 10        
        const diff = end - start
        // for (let i = 0; i < numOfLines; i++){
        //     strokeWeight(1 + i / numOfLines)
        //     const s = start + diff * i / numOfLines
        //     const e = start + diff * (i + 1) / numOfLines
        //     line(s * cos(angle), s * sin(angle), e * cos(angle), e * sin(angle))
        // }
    }  
}