import {VText} from "../components"
import {VElement} from "../core"
import {PxPosition, PxSize} from "../layout"
import {AnimationUtils} from "../utils"
import {style} from "../app"
import * as p5 from "p5"

export class ContinuousCircularProgressBar extends VElement{
    private readonly primaryColor: p5.Color = color("DeepSkyBlue")
    private readonly secondaryColor: p5.Color = color("DeepPink")

    private readonly radius: number
    private readonly weight: number
    private readonly centerPosition: PxPosition
    private readonly vtext: VText

    private value: number

    constructor(id: any, pxSize: PxSize, value: number){
        super(id, pxSize, false)
        this.value = value
        this.vtext = new VText("", style.text.font, style.text.size.xs)
        this.weight = 5
        this.radius = min(pxSize.getHeight(), pxSize.getWidth()) / 2 - this.weight / 2
        this.centerPosition = new PxPosition(
            pxSize.getWidth() / 2, 
            pxSize.getHeight() / 2
            )
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, value, duration, (s:number) => this.value = s)
    }

    public render() : void {
        push()
        translate(this.centerPosition.getX(), this.centerPosition.getY())

        noFill()
        strokeWeight(this.weight)
        
        // Background Arc
        stroke(style.color.front)
        this.renderArc(0, TWO_PI)

        // Circular progress Bar
        this.renderArcs()

        const text = Math.round(this.value).toString() + "%" 
        this.renderValueText(text)
        pop()
    }

    private renderArcs(): void{
        const numOfArcs = 8 // Number of Arcs used in color transition => total number of arcs = numOfArcs + 2
        const transitionRatio = 1 / 10 // ratio of total angle reserved for color transition 
        const totalAngle = TWO_PI * this.value / 100
        const transitionStartAngle = totalAngle * (1 - transitionRatio) / 2
        const angleStep = (totalAngle * transitionRatio) / numOfArcs

        stroke(this.primaryColor)
        this.renderArc(0, transitionStartAngle)

        stroke(this.secondaryColor)
        this.renderArc(transitionStartAngle + totalAngle * transitionRatio, transitionStartAngle)

        for(let i = 0; i < numOfArcs; i++){
            stroke(lerpColor(this.primaryColor, this.secondaryColor, i / numOfArcs))
            this.renderArc(transitionStartAngle + i * angleStep, angleStep)
        }
    }

    /**
     * 
     * @param start Arc starting angle (from - HALF_PI & anti-clockwise) 
     * @param angleDiff = Arc angle = end angle - start angle
     */
    private renderArc(start: number, angleDiff: number): void{
        arc(
                0, 
                0, 
                2 * this.radius,
                2 * this.radius, 
                - HALF_PI + start, 
                - HALF_PI + start + angleDiff 
            )
    }

    private renderValueText(text: string): void{
        textAlign(CENTER, CENTER)
        this.vtext.setText(text)
        this.vtext.render()
    }
}