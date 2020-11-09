import * as p5 from "p5";
import { VElement } from "../core";
import { PxPosition, PxSize } from "../layout";
import {AnimationUtils} from "../utils"

export class Gauge extends VElement{
    private readonly color
    private readonly backgroundColor
    private value: number
    private readonly radius: number
    private readonly centerPosition: PxPosition

    constructor(id: any, pxSize: PxSize, color: p5.Color, backgroundColor: p5.Color, value: number){ // value -> intensity ?
        super(id, pxSize, false)
        this.color = color
        this.backgroundColor = backgroundColor;
        this.value = value
        this.radius = min(pxSize.getHeight(), pxSize.getWidth()) / 2
        this.centerPosition = new PxPosition(
            pxSize.getWidth() / 2, 
            pxSize.getHeight() / 2
            )
        const duration = 1000 /*ms*/
        // AnimationUtils.animate(0, value, duration, (s:number) => this.value = s)
    }

    public render() : void {
        noStroke()
        this.renderArc()
        this.renderPointer()
        this.renderValueText() // Render value as VText under pointer
    }

    private renderArc() : void {
        const widthRatio = 0.2
        fill(this.color)
        arc(
            this.centerPosition.getX(), 
            this.centerPosition.getY(),
            this.radius * 2,
            this.radius * 2,
            -PI,
            0
        )
        fill(this.backgroundColor)
        arc(
            this.centerPosition.getX(),
            this.centerPosition.getY(),
            this.radius * 2 * (1 - widthRatio),
            this.radius * 2 * (1 - widthRatio),
            -PI, 
            0
        )
    }

    private renderPointer(): void{
        fill(this.color)
        push()
        translate(this.centerPosition.getX(), this.centerPosition.getY())
        rotate(this.value  * PI / 100)
        triangle(
            - this.radius /2,
            0,
            0, 
            this.radius / 8,
            0,
            - this.radius / 8
        )
        arc(
            0,
            0,
            this.radius / 4,
            this.radius / 4,
            - PI / 2,
            PI / 2
        )
        pop()
    }

    private renderValueText():void{
        // TO DO
    }
}