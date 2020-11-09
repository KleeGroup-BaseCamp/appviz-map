import * as p5 from "p5";
import { VElement } from "../core";
import { PxPosition, PxSize } from "../layout";

export class Light extends VElement{
    private color : p5.Color
    private readonly intensity: number
    private readonly radius: number
    private readonly centerPosition: PxPosition

    constructor(id: any, pxSize: PxSize, color: p5.Color, intensity: number){
        super(id, pxSize, false)
        this.color = color
        this.intensity = intensity
        this.radius = min(pxSize.getHeight(), pxSize.getWidth())
        this.centerPosition = new PxPosition(
            pxSize.getWidth() / 2, 
            pxSize.getHeight() / 2
            )
    }

    render(){
        noFill()
        let maxOpacity = this.intensity * 255 / 100
        for(let r = 0; r < this.radius; r++){
            let opacity = Math.round(maxOpacity* (1 - r / this.radius))
            this.color.setAlpha(opacity)
            stroke(this.color)
            circle(
                this.centerPosition.getX(), 
                this.centerPosition.getY(), 
                r
                ) 
        }
    }
}