import * as p5 from "p5";
import { VElement } from "../core";
import { PxPosition, PxSize } from "../layout";
import {AnimationUtils} from "../utils"

export class Light extends VElement{
    private readonly color : p5.Color
    private value: number
    private readonly radius: number
    private readonly centerPosition: PxPosition

    constructor(id: any, pxSize: PxSize, color: p5.Color, value: number){ // value -> intensity ?
        super(id, pxSize, false)
        this.color = color
        this.value = value
        this.radius = min(pxSize.getHeight(), pxSize.getWidth())
        this.centerPosition = new PxPosition(
            pxSize.getWidth() / 2, 
            pxSize.getHeight() / 2
            )
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, value, duration, (s:number) => this.value = s)
    }

    render(){
        noFill()
        let maxOpacity = this.value * 255 / 100
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