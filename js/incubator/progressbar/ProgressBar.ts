import * as p5 from "p5"
import {style} from "../../app"
import {VText} from "../../components"
import {AnimationUtils, PushPop} from "../../utils"
import { VElement } from "../../core"
import { PxSize } from "../../layout"

export class ProgressBar extends VElement{
    private readonly vtext: VText
    private readonly size: number

    private firstColor: p5.Color = style.color.a
    private secondColor? : p5.Color

    private percent: number

    constructor(id: any, pxSize: PxSize, percent: number) {
        super(id, pxSize, false)
        this.percent  = percent
        this.size = style.text.size.s
        this.vtext = new VText("", style.text.font, this.size)
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, percent, duration, (s:number) => this.percent = s)
    }
    
    public withFirstColor(firstColor: p5.Color): ProgressBar{
        this.firstColor = firstColor
        return this
    }
    public withSecondColor(secondColor: p5.Color): ProgressBar{
        this.secondColor = secondColor
        return this
    }

    @PushPop
    public render(): void {
        translate(0, this.getPxSize().getHeight() / 2)
        textAlign(LEFT, CENTER)
        this.vtext.setText(`${Math.floor(this.percent).toString()}%`)
        this.renderBar();
        const textVerticalPadding = 3 // Text is not perfectly centered vertically
        translate(0, -textVerticalPadding)
        this.vtext.render() 
    }
    
    @PushPop
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
        
        //There is always a color on the left 
        stroke(this.firstColor)
        line(0, 0, filledWidth, 0)
    
        //If there is a color on the right 
        if( this.secondColor){
            const transitionRatio = 1 / 5
            const transitionWidth = filledWidth * transitionRatio
            const transitionStart = (filledWidth - transitionWidth) / 2
            const numOfLines = 10
            
            for (let i = 0; i < numOfLines; i++){
                stroke(lerpColor(this.secondColor, this.firstColor, i / numOfLines))
                line(
                    transitionStart + transitionWidth * i / numOfLines, 
                    0, 
                    transitionStart + transitionWidth * (i + 1) / numOfLines, 
                    0
                )
            }
            // Fill beginning last to have primaryColor when percent = 0
            stroke(this.secondColor)
            line(0, 0, transitionStart , 0)
        }
    }
}