import * as p5 from "p5"
import {Component, ComponentProps} from "../../core"
import {PxSize} from "../../layout"
import {AnimationUtils} from "../../utils"
import {neon} from "../../../appViz/app"

export interface BarsSignalProps extends ComponentProps {}

export class BarsSignal extends Component{
    private rate: number

    constructor(rate: number, props:BarsSignalProps){
        super({...props, name: "BarsSignal"}, false)
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
        return this.rate > i ? neon.getStyle().text.color.primary : neon.getStyle().color.front
    }
}