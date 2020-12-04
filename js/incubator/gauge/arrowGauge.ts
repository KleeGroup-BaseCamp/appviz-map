import {VText} from "../../neon/components"
import {VElement} from "../../neon/core"
import {PxSize} from "../../neon/layout"
import {AnimationUtils, PushPop} from "../../neon/utils"
import {style} from "../../app"

export class ArrowGauge extends VElement{
    private readonly radius: number
    private readonly vtext: VText

    private percent: number

    constructor(id: any, pxSize: PxSize, percent: number){
        super(id, pxSize, false)
        this.percent = percent
        this.radius = min(pxSize.getHeight(), pxSize.getWidth()) / 2
        this.vtext = new VText("", style.text.font, this.getTextSize())
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, percent, duration, (s:number) => this.percent = s)
    }

    @PushPop
    public render() : void {
        translate(this.centerPosition.getX(), this.centerPosition.getY())
        this.renderArc()
        noStroke()
        this.renderPointer()
        this.renderValueText() // Render value as VText under pointer
    }

    private renderArc() : void {
        const weight = this.radius / 5
        noFill()
        strokeCap(ROUND)
        strokeWeight(weight)
        stroke(style.color.front)
        arc(0, 0, 
            this.radius * 2 - weight,
            this.radius * 2 - weight,
            -PI,
            0
        )
        stroke(style.text.color.primary)
        arc(0, 0,
            this.radius * 2 - weight,
            this.radius * 2 - weight,
            -PI,
            -PI + this.percent  * PI / 100
        )
    }

    @PushPop
    private renderPointer(): void{
        rotate(this.percent  * PI / 100)

        fill(style.color.front)
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
        circle(0,0,this.radius / 8)
    }

    @PushPop    
    private renderValueText(): void{
        const textPadding = this.radius / 3
        translate(0, textPadding)
        textAlign(CENTER, TOP)
        this.vtext.setText(Math.round(this.percent).toString())
        this.vtext.render()
    }

    private getTextSize(): number{ // Make into util function or use abstract gauge class 
        if (this.radius <= 25) return style.text.size.xxs
        if (this.radius <= 100) return style.text.size.m
        return style.text.size.xxl
    }
}