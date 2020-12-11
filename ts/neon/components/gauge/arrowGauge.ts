import {VText} from "../basics"
import {Component, ComponentProps} from "../.."
import {AnimationUtils, PushPop} from "../.."

export interface ArrowGaugeProps extends ComponentProps {}

export class ArrowGauge extends Component{
    private readonly radius: number
    private readonly vtext: VText

    private percent: number

    constructor(percent: number, props:ArrowGaugeProps){
        super(props, "Gauge", false)
        this.percent = percent
        this.radius = min(this.getHeight(), this.getWidth()) / 2
        this.vtext = new VText("", {fontSize: this.getTextSize()})

        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, percent, duration, (s:number) => this.percent = s)
    }

    @PushPop
    public render() : void {
        const displayText = this.radius > this.style.pxSizes.Gauge.s.getWidth() / 2
        translate(
            this.centerPosition.getX(), 
            this.centerPosition.getY() + (!displayText ? this.radius / 4 : 0)
        )
        this.renderArc()
        noStroke()
        this.renderPointer()
        if (displayText){
            this.renderValueText() // Render value as VText under pointer
        }
    }

    private renderArc() : void {
        const weight = this.radius / 5
        noFill()
        strokeCap(ROUND)
        strokeWeight(weight)
        stroke(this.style.color.front)
        arc(0, 0, 
            this.radius * 2 - weight,
            this.radius * 2 - weight,
            -PI,
            0
        )
        stroke(this.style.text.color.primary)
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

        fill(this.style.color.front)
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
        if (this.radius <= 25) return this.style.text.size.xxs
        if (this.radius <= 100) return this.style.text.size.m
        return this.style.text.size.xxl
    }
}