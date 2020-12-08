import * as p5 from "p5"
import {VText} from "../basics"
import {Component, ComponentProps} from "../../core"
import {AnimationUtils, PushPop} from "../../utils"
import {neon} from "../../../app"

export interface StripedGaugeProps extends ComponentProps {}

export class StripedGauge extends Component{
    private readonly firstColor: p5.Color = neon.getStyle().color.a
    private readonly secondColor: p5.Color = color(0)
    private readonly tertiaryColor: p5.Color = color("#323e52")

    private readonly radius: number
    private readonly vtext: VText

    private percent: number

    constructor(percent: number, props : StripedGaugeProps){
        super({...props, name: "StripedGauge"}, false)
        this.percent = percent
        this.radius = min(this.getHeight(), this.getWidth()) / 2
        this.vtext = new VText("", {fontSize: this.getTextSize()})
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, percent, duration, (s:number) => this.percent = s)
    }

    @PushPop
    public render() : void {
        translate(this.centerPosition.getX(), this.centerPosition.getY())
        this.renderArcs()
        
        const innerRadius = this.radius * 0.8
        fill(neon.getStyle().color.back)
        circle(0, 0, innerRadius * 2)

        const text = Math.round(this.percent).toString() + "%" 
        this.renderValueText(text)

        const margin = 3
        textSize(this.getTextSize())
        this.renderDottedCircle(innerRadius - margin)
        if(this.radius >= 40){
            this.renderDottedCircle(textWidth("100%") / 2 + margin) // Max text width = textWidth("100%")
        }
    }

    private renderArcs(): void{
        const margin = radians(3)
        const numOfGraduations = max(35, Math.ceil(this.radius * 3 / 4))
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

    private getTextSize(): number{ // Make into util function or use abstract gauge class
        if (this.radius <= 25) return neon.getStyle().text.size.xxs
        if (this.radius <= 100) return neon.getStyle().text.size.m
        return neon.getStyle().text.size.xxl
    }
}