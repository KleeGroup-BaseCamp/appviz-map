import { style } from "../../app"
import { VText } from "../../components"

export class YLinearAxis{
    private readonly yMin: number
    private readonly yMax: number
    private readonly height: number
    private readonly yLabels: VText[] = []
    private readonly numOfTicks = 5


    constructor(yMin: number, yMax: number, height: number){
        this.yMin = yMin
        this.yMax = yMax
        this.height = height
        const diff = yMax - yMin
        for(let i = 0; i < this.numOfTicks; i++){
            const text = Math.floor(diff * i / this.numOfTicks).toString()
            this.yLabels.push(new VText(text, style.text.font, style.text.size.s))
        }
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
            this.yLabels[i].render()
            pop()
            translate(0, - this.height / this.numOfTicks)
        }
        pop()
    }
}