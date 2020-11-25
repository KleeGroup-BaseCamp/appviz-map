import {style} from "../../app"
<<<<<<< HEAD
import {AbstractLinearAxis} from "./abstractLinearAxis"
=======
import {AbstractLinearAxis} from "./abstractlinearAxis"
>>>>>>> origin/master

export class YLinearAxis extends AbstractLinearAxis{
    private readonly height: number

    constructor(yMin: number, yMax: number, numOfTicks: number, height: number){
        super(yMin,yMax, numOfTicks)
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