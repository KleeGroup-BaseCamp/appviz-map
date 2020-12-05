import * as p5 from "p5"
import {VText} from "../../components"
import {AnimationUtils, ColorUtils, PushPop} from "../../utils"
import {VElement2, VElement ,VElementProps} from "../../core"
import {PxPosition, PxSize} from "../../layout"
import {style} from "../../../app"

export interface StripedProgressBarProps extends VElementProps {
    firstColor?: p5.Color,
    secondColor?: p5.Color, 
    icon?: string
}

export class StripedProgressBar extends VElement2{
    private readonly hexagon: Hexagon
    private readonly iconProvided: boolean
    private readonly firstColor: p5.Color
    private readonly secondColor? : p5.Color  
    private readonly vText: VText 

    private percent: number

    constructor(percent: number, props : StripedProgressBarProps) {
        super(props, false)
        this.firstColor = props.firstColor ?? ColorUtils.clone(style.color.a)
        this.secondColor = props.secondColor ? ColorUtils.clone(props.secondColor) : undefined

        this.percent  = percent
        this.hexagon = new Hexagon("-1", this.getPxSize())
        if (props.icon){          
            this.iconProvided = true
            this.vText = new VText(props.icon, style.icon.font, style.text.size.xxl)
        } else {
            this.iconProvided = false
            this.vText = new VText("", style.text.font, this.getTextSize()) // Fallback if no icon provided with 'withIcon'
        }    
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, percent, duration, (s:number) => this.percent = s)
    }
    
    public render(): void {
        const hexagonRadius = this.hexagon.getCircumRadius()
        this.renderHexagon(hexagonRadius)
        this.renderText(hexagonRadius)
        this.renderBar()
    }
    
    @PushPop
    private renderHexagon(hexagonRadius: number): void{
        translate(- this.getPxSize().getWidth() / 2 + hexagonRadius, 0)
        this.hexagon.render()
    }

    @PushPop
    private renderText(hexagonRadius: number): void{
        textAlign(CENTER, CENTER)
        const verticalTextPadding = 5 // Text is not perfectly centered vertically
        translate(hexagonRadius, hexagonRadius - verticalTextPadding)
        if(!this.iconProvided){
            this.vText.setText(`${Math.floor(this.percent)}%`)
        }
        this.vText.render() 
    }

    @PushPop
    private renderBar(): void{
        const rightPadding = 20
        translate(0, this.getHeight() / 2)
        this.renderStroke(rightPadding)
        this.renderStripes(rightPadding)
    }

    private renderStroke(rightPadding: number): void{
        const xInter = this.hexagon.getCircumRadius() * (2 - cos(radians(60)) / 2)// xCoor of intersection with hexagon
        const yInter = this.getPxSize().getHeight() / 4
        noFill()
        stroke(style.color.front)
        strokeWeight(2)
        beginShape()
        vertex(xInter, -yInter)
        vertex(this.getPxSize().getWidth() - rightPadding, -yInter)
        vertex(this.getPxSize().getWidth(), 0)
        vertex(this.getPxSize().getWidth() - rightPadding, yInter)
        vertex(xInter, yInter)
        endShape()
    }
    
    private renderStripes(rightPadding: number): void{
        const numOfStripes = Math.ceil(this.getWidth() / 10)
        const verticalPadding = this.getHeight() / 10 // Padding (top, bottom) to stroke
        const totalWidth =  this.getPxSize().getWidth() - this.hexagon.getCircumRadius() * 2 - rightPadding
        const horizontalPadding = totalWidth/ numOfStripes * 0.4 // Space between stripes
        const stripeWidth = totalWidth/ numOfStripes - horizontalPadding
        strokeWeight(stripeWidth)
        const leftPadding = stripeWidth // should be hexagonStrokeWeight + stripeWidth / 2 + smth
        for (let i = 0; i < numOfStripes; i++){
            const ratio = i / numOfStripes
            stroke(this.pickStripeColor(ratio))
            const x = this.hexagon.getCircumRadius() * 2 + leftPadding + ratio * totalWidth + horizontalPadding
            const y = this.getPxSize().getHeight() / 4 - verticalPadding - stripeWidth / 2
            line(x, -y, x, y)
        }
    }

    private pickStripeColor(ratio: number): p5.Color{
        if(ratio >= this.percent / 100){
            return style.color.front
        } else if (this.secondColor){
            return lerpColor(this.firstColor, this.secondColor, ratio)
        }
        return this.firstColor
    }

    private getTextSize(): number{ // Make into util function
        const width = this.getWidth()
        if (width <= 150) return style.text.size.xxs
        if (width <= 250) return style.text.size.xs
        return style.text.size.m
    }
}
export class Hexagon extends VElement {
    private readonly circumCenter: PxPosition
    private readonly circumRadius: number
    private readonly weight: number

    constructor(id: any, pxSize: PxSize) {
        super(id, pxSize, false)
        const width = this.getPxSize().getWidth()
        const height = this.getPxSize().getHeight()
        this.weight = 4
        this.circumCenter = new PxPosition(width / 2, height / 2)
        this.circumRadius = (min(height / sin(radians(60)), width) - this.weight) / 2
    }

    @PushPop
    public render() {
        noFill()
        strokeWeight(this.weight)
        stroke(style.color.front)
        translate(this.circumCenter.getX(), this.circumCenter.getY())
        beginShape()
        for (let i = 0; i < 6; i++) {
            vertex(
                this.circumRadius * cos(radians(60 * i)),
                - this.circumRadius * sin(radians(60 * i))
            )
        }
        endShape(CLOSE)
    }

    public getCircumRadius(): number{
        return this.circumRadius
    }
}
