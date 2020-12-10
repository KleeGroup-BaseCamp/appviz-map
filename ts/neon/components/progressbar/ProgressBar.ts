import * as p5 from "p5"
import {VText} from "../basics"
import {AnimationUtils, PushPop, ColorUtils} from "../../utils"
import {Component, ComponentProps} from "../../core"
import { n3on } from "../.."

export interface ProgressBarProps extends ComponentProps {
    firstColor?: p5.Color,
    secondColor?: p5.Color
}

export class ProgressBar extends Component {
    private readonly vtext: VText
    private readonly size: number

    private readonly firstColor: p5.Color
    private readonly secondColor? : p5.Color

    private percent: number

    constructor(percent: number, props : ProgressBarProps) {
        super(props, "ProgressBar", false)
        this.firstColor = props.firstColor ?? ColorUtils.clone(n3on.getStyle().color.a)
        this.secondColor = props.secondColor ? ColorUtils.clone(props.secondColor) : undefined

        this.percent  = percent
        this.size = this.getTextSize()
        this.vtext = new VText("", {fontSize: this.size})
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, percent, duration, (s:number) => this.percent = s)
    }

    @PushPop
    public render(): void {
        translate(0, this.getPxSize().getHeight() / 2)
        textAlign(LEFT, CENTER)
        this.vtext.setText(`${Math.floor(this.percent).toString()}%`)
        this.renderBar();
        const textVerticalPadding = 4 // Text is not perfectly centered vertically
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
        stroke(n3on.getStyle().color.front)
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

    private getTextSize(): number{ // Make into util function
        const width = this.getWidth()
        if (width <= 100) return n3on.getStyle().text.size.xs
        if (width <= 150) return n3on.getStyle().text.size.s
        return n3on.getStyle().text.size.m
    }
}