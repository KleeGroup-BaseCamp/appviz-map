import {VText} from "../../components"
import {VElement} from "../../core"
import {PxPosition, PxSize} from "../../layout"
import {AnimationUtils, PushPop} from "../../utils"
import {style} from "../../app"

export class ArrowGauge extends VElement{
    private readonly radius: number
    private readonly vtext: VText

    private percent: number

    constructor(id: any, pxSize: PxSize, percent: number){
        super(id, pxSize, false)
        this.percent = percent
        this.vtext = new VText("", style.text.font, style.text.size.s)
        this.radius = min(pxSize.getHeight(), pxSize.getWidth()) / 2
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
        const weight: number = 8
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
        circle(0,0,6)
    }

    @PushPop    
    private renderValueText(): void{
        const textPadding = min(30, this.getPxSize().getHeight() / 2)
        translate(0, textPadding)
        textAlign(CENTER)
        this.vtext.setText(Math.round(this.percent).toString())
        this.vtext.render()
    }
}