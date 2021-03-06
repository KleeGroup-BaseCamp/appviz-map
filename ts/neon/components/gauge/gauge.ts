import {VText} from "../basics"
import {Component, ComponentProps} from "../../core"
import {AnimationUtils, PushPop, ColorUtils} from "../../utils"
import * as p5 from "p5"

export interface GaugeProps extends ComponentProps {
    firstColor?: p5.Color,
    secondColor?: p5.Color
}

export class Gauge extends Component {
    private readonly firstColor: p5.Color
    private readonly secondColor?: p5.Color
    private readonly radius: number
    private readonly vtext: VText
    public readonly weight: number
    
    private percent: number
    
    constructor(percent: number, props: GaugeProps){
        super(props, "Gauge", false)
        this.firstColor = props.firstColor ?? ColorUtils.clone(this.style.color.a)
        this.secondColor = props.secondColor

        this.percent = percent

        const minDim = min(this.getHeight(), this.getWidth())
        this.weight = min(minDim / 15, 10)
        this.radius = minDim / 2 - this.weight / 2
        this.vtext = new VText("", {fontSize: this.getTextSize()})
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, percent, duration, (s:number) => this.percent = s)
    }

    @PushPop
    public render() : void {
        translate(this.centerPosition)

        noFill()
        strokeWeight(this.weight)
        
        // Background Arc
        stroke(this.style.color.front)
        this.renderArc(0, TWO_PI)

        // Circular progress Bar
        this.renderArcs()
        
        if (this.radius > this.style.pxSizes.Gauge.s.getWidth() / 2){
            const text = Math.round(this.percent).toString() + "%" 
            this.renderValueText(text)
        }
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

    private getTextSize(): number{ // Make into util function or use abstract gauge class
        if (this.radius <= 25) return this.style.text.size.xxs
        if (this.radius <= 100) return this.style.text.size.m
        return this.style.text.size.xxl
    }
}