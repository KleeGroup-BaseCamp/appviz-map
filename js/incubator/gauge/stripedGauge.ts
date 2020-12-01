import * as p5 from "p5"
import {VText} from "../../components"
import {VElement} from "../../core"
import {PxPosition, PxSize } from "../../layout"
import {AnimationUtils, PushPop} from "../../utils"
import {style} from "../../app"

export class StripedGauge extends VElement{
    private readonly firstColor: p5.Color = style.color.a
    private readonly secondColor: p5.Color = color(0)
    private readonly tertiaryColor: p5.Color = color("#323e52")

    private readonly radius: number
    private readonly centerPosition: PxPosition
    private readonly vtext: VText

    private percent: number

    constructor(id: any, pxSize: PxSize, percent: number){
        super(id, pxSize, false)
        this.percent = percent
        this.vtext = new VText("", style.text.font, style.text.size.xs)
        this.radius = min(pxSize.getHeight(), pxSize.getWidth()) / 2
        this.centerPosition = new PxPosition(
            pxSize.getWidth() / 2, 
            pxSize.getHeight() / 2
            )
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, percent, duration, (s:number) => this.percent = s)
    }

    @PushPop
    public render() : void {
        translate(this.centerPosition.getX(), this.centerPosition.getY())
        this.renderArcs()
        
        const innerRadius = this.radius * 0.8
        fill(style.color.back)
        circle(0, 0, innerRadius * 2)

        const text = Math.round(this.percent).toString() + "%" 
        this.renderValueText(text)

        const margin = 3
        this.renderDottedCircle(innerRadius - margin)
        this.renderDottedCircle(textWidth("100%") / 2 + margin) // Max text width = textWidth("100%")
    }

    private renderArcs(): void{
        const margin = radians(3)
        const numOfGraduations = 60
        const angleStep = (TWO_PI - margin * numOfGraduations) / numOfGraduations
        noStroke()
        
        for (let i = 0; i < numOfGraduations; i++){
            const color =  (i< (numOfGraduations * this.percent / 100))
            ? this.firstColor
            : this.secondColor 
            fill(color)
            this.renderArc(angleStep, margin, i)
        }
    }

    private renderArc(angleStep: number, margin: number, index: number): void{
        const alpha = (angleStep + margin) * index - HALF_PI 
        arc(0, 0, 
                2 * this.radius,
                2 * this.radius, 
                alpha, 
                alpha  + angleStep
            )
    }

    private renderDottedCircle(radius: number): void{
        const numOfPoints = this.radius * 4 / 3
        const weight = 2
        const angleStep = 2 * PI / numOfPoints
        noStroke()
        fill(this.tertiaryColor)
        for(let i = 0; i < numOfPoints; i++){
            circle(radius * cos(i * angleStep), radius * sin(i * angleStep), weight)
        }
    }

    private renderValueText(text: string): void{
        textAlign(CENTER, CENTER)
        this.vtext.setText(text)
        this.vtext.render()
    }
}