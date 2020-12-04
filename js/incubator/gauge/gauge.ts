import {VText} from "../../neon/components"
import {VElement} from "../../neon/core"
import {PxPosition, PxSize} from "../../neon/layout"
import {AnimationUtils, PushPop} from "../../neon/utils"
import {style} from "../../app"
import * as p5 from "p5"

export class Gauge extends VElement{
    private firstColor: p5.Color = style.color.a
    private secondColor?: p5.Color

    private readonly radius: number
    private readonly vtext: VText
    
    private percent: number
    public readonly weight: number
    
    constructor(id: any, pxSize: PxSize, percent: number){
        super(id, pxSize, false)
        this.percent = percent
        const minDim = min(pxSize.getHeight(), pxSize.getWidth())
        this.weight = min(minDim / 15, 10)
        this.radius = minDim / 2 - this.weight / 2
        this.vtext = new VText("", style.text.font, this.getTextSize())
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, percent, duration, (s:number) => this.percent = s)
    }

    @PushPop
    public render() : void {
        translate(this.centerPosition.getX(), this.centerPosition.getY())

        noFill()
        strokeWeight(this.weight)
        
        // Background Arc
        stroke(style.color.front)
        this.renderArc(0, TWO_PI)

        // Circular progress Bar
        this.renderArcs()

        const text = Math.round(this.percent).toString() + "%" 
        this.renderValueText(text)
    }

    private renderArcs(): void{
        const numOfArcs = 8 // Number of Arcs used in color transition => total number of arcs = numOfArcs + 2
        const transitionRatio = 1 / 10 // ratio of total angle reserved for color transition 
        const totalAngle = TWO_PI * this.percent / 100
        const transitionStartAngle = totalAngle * (1 - transitionRatio) / 2
        const angleStep = (totalAngle * transitionRatio) / numOfArcs

        stroke(this.firstColor)
        this.renderArc(0, totalAngle)

        if(this.secondColor){
            stroke(this.secondColor)
            this.renderArc(transitionStartAngle + totalAngle * transitionRatio, transitionStartAngle)
    
            for(let i = 0; i < numOfArcs; i++){
                stroke(lerpColor(this.firstColor, this.secondColor, i / numOfArcs))
                this.renderArc(transitionStartAngle + i * angleStep, angleStep)
            }
        }
    }

    /**
     * 
     * @param start Arc starting angle (from - HALF_PI & anti-clockwise) 
     * @param angleDiff = Arc angle = end angle - start angle
     */
    private renderArc(start: number, angleDiff: number): void{
        const alpha = - HALF_PI + start 
        arc(
                0, 
                0, 
                2 * this.radius,
                2 * this.radius, 
                alpha, 
                alpha + angleDiff 
            )
    }

    private renderValueText(text: string): void{
        textAlign(CENTER, CENTER)
        this.vtext.setText(text)
        this.vtext.render()
    }

    public withFirstColor(firstColor: p5.Color): Gauge{
        this.firstColor = firstColor
        return this
    }

    public withSecondColor(secondColor: p5.Color): Gauge{
        this.secondColor = secondColor
        return this
    }

    private getTextSize(): number{ // Make into util function or use abstract gauge class
        if (this.radius <= 25) return style.text.size.xxs
        if (this.radius <= 100) return style.text.size.m
        return style.text.size.xxl
    }
}