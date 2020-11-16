import { VText } from "../components";
import { VElement } from "../core";
import { PxPosition, PxSize } from "../layout";
import {AnimationUtils} from "../utils"
import {style} from "../app"

export class DiscreteCircularProgressBar extends VElement{
    private readonly radius: number
    private readonly centerPosition: PxPosition
    private readonly vtext: VText

    private value: number

    constructor(id: any, pxSize: PxSize, value: number){
        super(id, pxSize, false)
        this.value = value
        this.vtext = new VText("", style.text.font, style.text.size.s)
        this.radius = min(pxSize.getHeight(), pxSize.getWidth()) / 2
        this.centerPosition = new PxPosition(
            pxSize.getWidth() / 2, 
            pxSize.getHeight() / 2
            )
        const duration = 1000 /*ms*/
        // AnimationUtils.animate(0, value, duration, (s:number) => this.value = s)
    }

    public render() : void {
        push()
        translate(this.centerPosition.getX(), this.centerPosition.getY())
        this.renderArcs()
        
        const innerRadius = this.radius * 0.9
        fill(style.color.back)
        circle(0,0,innerRadius)

        this.renderValueText() // Render value as VText under pointer
        pop()
    }

    private renderArcs(): void{
        const margin = radians(5)
        const numOfGraduations = 30
        const angle = (TWO_PI - margin * numOfGraduations) / numOfGraduations
        noStroke()
        fill(0)
        for (let i = 0; i < numOfGraduations; i++){
            arc(
                0, 
                0, 
                2 * this.radius,
                2 * this.radius, 
                (angle + margin) * i , 
                (angle + margin) * i + angle
            )
        }
    }

    private renderValueText(): void{
        // const textPadding = min(30, this.getPxSize().getHeight() / 2)
        // push()
        // textAlign(CENTER)
        // translate(this.centerPosition.getX(), this.centerPosition.getY() + textPadding)
        // this.vtext.setText(Math.round(this.value).toString())
        // this.vtext.render()
        // pop()
    }
}