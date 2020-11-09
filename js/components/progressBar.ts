import * as p5 from "p5"
import {Component}  from "./component"
import {style} from "../app"
import {VText} from "./vtext"
import {AnimationUtils} from "../utils"

export class ProgressBar implements Component{
    private readonly maxValue: number
    private readonly width: number
    private readonly vtext: VText

    private value: number

    constructor(value: number, maxValue: number, width: number) {
        this.value = value
        this.maxValue = maxValue
        this.width = width
        this.vtext = new VText("", style.text.font, style.text.size.s)
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, value, duration, (s:number) => this.value = s)
    }
    
    public render(): void {
        const weight: number = 8
        this.vtext.setText(Math.floor(this.value).toString())
        this.vtext.render() 
        push()
        translate(20, (-textAscent() + weight) / 2 )
        this.renderBar(weight);
        pop()
    }

    private renderBar(weight: number): void{
        strokeJoin(ROUND)
        
        strokeWeight(weight)
        stroke(style.color.front)
        line(0, 0, this.width, 0)
        
        stroke(style.text.color.primary)
        const size = this.value * this.width / this.maxValue  
        line(0, 0, size, 0)
    }
}