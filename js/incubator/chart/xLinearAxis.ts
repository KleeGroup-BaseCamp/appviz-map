import {style} from "../../app"
import {AbstractLinearAxis} from "./abstractlinearAxis"

export class XLinearAxis extends AbstractLinearAxis{
    private readonly width: number

    constructor(xMin: number, xMax: number, width: number){
        super(xMin, xMax)
        this.width = width
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
            this.labels[i].render()
            pop()
            translate(this.width  / this.numOfTicks, 0)
        }
        pop()
    }

    public getCoorForValue(value: number){
        return (value - this.min)/ (this.max - this.min) * (this.width)
    }
}