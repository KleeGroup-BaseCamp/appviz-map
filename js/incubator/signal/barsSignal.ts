import * as p5 from "p5"
import {VElement} from "../../core"
import {PxSize} from "../../layout"
import {AnimationUtils} from "../../utils"
import {style} from "../../app"

export class BarsSignal extends VElement{
    private rate: number

    constructor(id: any, pxSize: PxSize, rate: number){
        super(id, pxSize, false)
        this.rate = rate
        const duration = 1000 /*ms*/
        AnimationUtils.animate(0, rate, duration, (s:number) => this.rate = s)
    }

    public render() : void {
        noStroke()
        const padding = min(this.getWidth(), this.getHeight()) / 15
        const numOfBars = 5
        const barWidth = (this.getPxSize().getWidth() - (numOfBars - 1) * padding) / numOfBars
        const maxHeight = this.getPxSize().getHeight()
        for (let i = 0; i < numOfBars; i++){
            const barHeight = maxHeight * (i + 1) / numOfBars
            push()
            fill(this.pickColor(i))
            translate((barWidth + padding) * i, maxHeight - barHeight)
            rect(0, 0, barWidth, barHeight)
            pop()       
        }
    }



    private pickColor(i:number): p5.Color{
        return this.rate > i ? style.text.color.primary : style.color.front
    }
}