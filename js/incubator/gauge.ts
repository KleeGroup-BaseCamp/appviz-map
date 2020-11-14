import { VText } from "../components";
import { VElement } from "../core";
import { PxPosition, PxSize } from "../layout";
import {AnimationUtils} from "../utils"
import {style} from "../app"

export class Gauge extends VElement{
    private readonly radius: number
    private readonly centerPosition: PxPosition
    private readonly vtext: VText

    private value: number

    constructor(id: any, pxSize: PxSize, value: number){ // value -> intensity ?
        super(id, pxSize, false)
        this.value = value
        this.vtext = new VText("", style.text.font, style.text.size.s)
        this.radius = min(pxSize.getHeight(), pxSize.getWidth()) / 2
        this.centerPosition = new PxPosition(
            pxSize.getWidth() / 2, 
            pxSize.getHeight() / 2
            )
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, value, duration, (s:number) => this.value = s)
    }

    public render() : void {
        this.renderArc()
        noStroke()
        this.renderPointer()
        this.renderValueText() // Render value as VText under pointer
    }

    private renderArc() : void {
        const weight: number = 8
        noFill()
        strokeCap(ROUND)
        strokeWeight(weight)
        stroke(style.color.front)
        arc(
            this.centerPosition.getX(), 
            this.centerPosition.getY(),
            this.radius * 2 - weight,
            this.radius * 2 - weight,
            -PI,
            0
        )
        stroke(style.text.color.primary)
        arc(
            this.centerPosition.getX(), 
            this.centerPosition.getY(),
            this.radius * 2 - weight,
            this.radius * 2 - weight,
            -PI,
            -PI + this.value  * PI / 100
        )
    }

    private renderPointer(): void{
        fill(style.color.front)
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
        fill('blue')
        circle(0,0,6)
        pop()
    }

    private renderValueText(): void{
        const textPadding = min(30, this.getPxSize().getHeight() / 2)
        push()
        textAlign(CENTER)
        translate(this.centerPosition.getX(), this.centerPosition.getY() + textPadding)
        this.vtext.setText(Math.round(this.value).toString())
        this.vtext.render()
        pop()
    }
}