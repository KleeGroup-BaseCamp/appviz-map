import { style } from "../../app"
import { VText } from "../../components"

export class XLinearAxis{
    private readonly xMin: number
    private readonly xMax: number
    private readonly width: number
    private readonly xLabels: VText[] = []
    private readonly numOfTicks = 5

    constructor(xMin: number, xMax: number, width: number){
        this.xMin = xMin
        this.xMax = xMax
        this.width = width
        const diff = xMax - xMin
        for(let i = 0; i < this.numOfTicks; i++){
            const text = Math.floor(diff * i / this.numOfTicks).toString()
            this.xLabels.push(new VText(text, style.text.font, style.text.size.s))
        }
    }

    public render():void{
        stroke(style.color.front)
        line(0, 0, this.width, 0)
        this.renderTicks()
    }

    private renderTicks(){
        const tickHeight = 5
        stroke(style.color.front)
        push()
        textAlign(CENTER, TOP)
        for(let i = 0; i < this.numOfTicks; i++){
            line(0, tickHeight / 2, 0, -tickHeight / 2)
            push()
            this.xLabels[i].render()
            pop()
            translate(this.width  / this.numOfTicks, 0)
        }
        pop()
    }
}