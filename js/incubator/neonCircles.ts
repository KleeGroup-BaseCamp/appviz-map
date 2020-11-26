import * as p5 from "p5";
import { sketch } from "../app";
import { VElement } from "../core";
import { PxSize } from "../layout";

declare let drawingContext: CanvasRenderingContext2D

export class NeonCircles extends VElement{
    private readonly primaryColor = color("HotPink")
    private readonly secondaryColor = color("CornflowerBlue")

    constructor(id: any, pxSize: PxSize){
        super(id, pxSize, false)
    }

    public render(): void{
        noFill()
        strokeWeight(2)
        push()
        translate(this.getWidth() / 2, this.getHeight() / 2)
        const numOfCircles = 5
        const maxRadius = min(this.getWidth(), this.getHeight()) / 2
        for(let i =0; i < numOfCircles; i++){
            this.renderNeonCircle((i + 1) / numOfCircles * maxRadius, lerpColor(this.primaryColor, this.secondaryColor, i / numOfCircles))
        }
        pop()
    }

    private renderNeonCircle(radius: number, color: p5.Color): void{
        push()
        stroke(color)
        drawingContext.shadowColor = color.toString();
        drawingContext.shadowBlur = 10 // TO DO: try different values for best visual
        circle(0, 0, radius)
        pop()
    }
}