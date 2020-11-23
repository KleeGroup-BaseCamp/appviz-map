import * as p5 from "p5"
import { VText } from "../../components";
import { AnimationUtils } from "../../utils";
import {VElement} from "../../core"
import { PxPosition, PxSize } from "../../layout"
import { style } from "../../app"

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

    render() {
        noFill()
        strokeWeight(this.weight)
        stroke(style.color.front)
        push()
        translate(this.circumCenter.getX(), this.circumCenter.getY())
        beginShape()
        for (let i = 0; i < 6; i++) {
            vertex(
                this.circumRadius * cos(radians(60 * i)),
                - this.circumRadius * sin(radians(60 * i))
            )
        }
        endShape(CLOSE)
        pop()
    }

    public getCircumRadius(): number{
        return this.circumRadius
    }
}

export class StripedProgressBar extends VElement{
    private readonly hexagon: Hexagon
    private iconProvided: boolean
    private primaryColor: p5.Color
    private secondaryColor: p5.Color | undefined
    private vText: VText 
    private percent: number

    constructor(id: any, pxSize: PxSize, percent: number) {
        super(id, pxSize, false)
        this.percent  = percent
        this.hexagon = new Hexagon("-1", pxSize)
        this.iconProvided = false
        this.vText = new VText("", style.text.font, style.text.size.l) // Fallback if no icon provided with 'withIcon'
        this.primaryColor = style.color.a
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, percent, duration, (s:number) => this.percent = s)
    }
    
    public render(): void {
        const hexagonRadius = this.hexagon.getCircumRadius()
        push()
        translate(- this.getPxSize().getWidth() / 2 + hexagonRadius, 0)
        this.hexagon.render()
        pop()

        textAlign(CENTER, CENTER)
        const verticalTextPadding = 5 // Text is not perfectly centered vertically
        push()
        translate(hexagonRadius, hexagonRadius - verticalTextPadding)
        if(!this.iconProvided){
            this.vText.setText(`${Math.floor(this.percent)}%`)
        }
        this.vText.render() 
        pop()

        const rightPadding = 20 // 
        push()
        translate(0, this.getHeight() / 2)
        this.renderStroke(rightPadding)
        this.renderStripes(rightPadding)
        pop()
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
        const numOfStripes = 20
        const verticalPadding = 10 // Padding (top, bottom) to stroke
        const horizontalPadding = 5 // Space between stripes
        const totalWidth =  this.getPxSize().getWidth() - this.hexagon.getCircumRadius() * 2 - rightPadding
        const stripeWidth = totalWidth/ numOfStripes - horizontalPadding
        strokeWeight(stripeWidth)
        for (let i = 0; i < numOfStripes; i++){
            const ratio = i / numOfStripes
            stroke(this.pickStripeColor(ratio))
            const x = this.hexagon.getCircumRadius() * 2 + stripeWidth / 2 + ratio * totalWidth + horizontalPadding
            const y = this.getPxSize().getHeight() / 4 - verticalPadding - stripeWidth / 2
            line(x, -y, x, y)
        }
    }

    private pickStripeColor(ratio: number): p5.Color{
        if(ratio >= this.percent / 100){
            return style.color.front
        }
        else if (this.secondaryColor){
            return lerpColor(this.primaryColor, this.secondaryColor, ratio)
        }
        return this.primaryColor
    }

    public withColors(primaryColor: p5.Color, secondaryColor?: p5.Color): StripedProgressBar{
        this.primaryColor = primaryColor
        this.secondaryColor = secondaryColor
        return this
    }

    public withIcon(icon: string){
        this.iconProvided = true
        this.vText = new VText(icon, style.icon.font, style.text.size.xxl)
        return this
    }
}
