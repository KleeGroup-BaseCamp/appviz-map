import { style } from "../../app"
import { LinearAxis } from "./linearAxis"

export class YLinearAxis extends LinearAxis{

    private readonly height: number

    constructor(yMin: number, yMax: number, height: number){
        super(yMin,yMax)
        this.height = height
    }

    public render():void{
        stroke(style.color.front)
        line(0, 0, 0, -this.height)
        this.renderTicks()
    }

    private renderTicks(){
        const tickHeight = 5
        stroke(style.color.front)
        push()
        textAlign(RIGHT, CENTER)
        for(let i = 0; i < this.numOfTicks; i++){
            line(-tickHeight / 2, 0, tickHeight / 2, 0)
            push()
            translate(0, -3) // Numbers in style.text.font are not perfectly centered vertically
            this.labels[i].render()
            pop()
            translate(0, - this.height / this.numOfTicks)
        }
        pop()
    }

    public getCoorForValue(value: number){
        return - (value - this.min) / (this.max - this.min) * (this.height)
    }
}