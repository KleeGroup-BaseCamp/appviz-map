import * as p5 from "p5"
import {style} from "../app"
import {VText} from "../components"
import {AnimationUtils} from "../utils"
import { VElement } from "../core"
import { PxSize } from "../layout"

export class BiColorProgressBar extends VElement{
    private readonly vtext: VText
    private readonly size: number
    
    private primaryColor: p5.Color
    private secondaryColor: p5.Color | undefined
    private percent: number

    constructor(id: any, pxSize: PxSize, percent: number) {
        super(id, pxSize, false)
        this.percent  = percent
        this.size = style.text.size.s
        this.vtext = new VText("", style.text.font, this.size)
        this.primaryColor = style.color.a
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, percent, duration, (s:number) => this.percent = s)
    }
    
    public render(): void {
        push()
        translate(0, this.getPxSize().getHeight() / 2)
        textAlign(LEFT, CENTER)
        this.vtext.setText(`${Math.floor(this.percent).toString()}%`)
        push()
        const textVerticalPadding = 3 // Text is not perfectly centered vertically
        translate(0, -textVerticalPadding)
        this.vtext.render() 
        pop()
        this.renderBar();
        pop()
    }
    
    private renderBar(): void{
        const padding = 7
        const weight = 8
        textSize(this.size)
        const vTextWidth = textWidth("100%")
        const barWidth = this.getPxSize().getWidth() - vTextWidth - padding - weight / 2
        const filledWidth = barWidth * this.percent / 100
        translate(vTextWidth + padding, 0)
        strokeWeight(weight)
        strokeJoin(ROUND)
        stroke(style.color.front)
        line(0, 0, barWidth, 0)
        
        if(!this.secondaryColor){
            stroke(this.primaryColor)
            line(0, 0, filledWidth, 0)
        } else{
            const transitionRatio = 1 / 5
            const transitionWidth = filledWidth * transitionRatio
            const transitionStart = (filledWidth - transitionWidth) / 2
            const numOfLines = 10
            
            for (let i = 0; i < numOfLines; i++){
                stroke(lerpColor(this.primaryColor, this.secondaryColor, i / numOfLines))
                line(
                    transitionStart + transitionWidth * i / numOfLines, 
                    0, 
                    transitionStart + transitionWidth * (i + 1) / numOfLines, 
                    0
                )
            }
            stroke(this.secondaryColor)
            line(transitionStart + transitionWidth, 0, filledWidth, 0)

            // Fill beginning last to have primaryColor when percent = 0
            stroke(this.primaryColor)
            line(0, 0, transitionStart , 0)
        }
    }

    public withColors(primaryColor: p5.Color, secondaryColor?: p5.Color): BiColorProgressBar{
        this.primaryColor = primaryColor
        this.secondaryColor = secondaryColor
        return this
    }
}