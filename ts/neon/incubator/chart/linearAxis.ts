import {style} from "../../../app"
import {VText} from "../basics"

type ChartType = "x" | "y"
export class LinearAxis{
    private readonly min: number
    private readonly max: number
    private readonly labels: VText[] = []
    private readonly numOfTicks: number
    private readonly length: number
    private readonly chartType: ChartType


    constructor(chartType: ChartType, min: number, max: number, numOfTicks: number, length: number){
        this.chartType = chartType
        this.min = min
        this.max = max
        this.numOfTicks = numOfTicks
        this.length = length
        const diff = max - min
        for(let i = 0; i < this.numOfTicks; i++){
            const text = (min + Math.floor(diff * i / this.numOfTicks)).toString()
            this.labels.push(
                new VText(
                    text, 
                    {
                        fontSize: style.text.size.xs, 
                        fontColor: style.text.color.secondary
                    }
                )
            )
        }
    }

    public render(): void{
        stroke(style.color.front)
        this.chartType == "x" 
            ? line(0, 0, this.length, 0) 
            : line(0, 0, 0, -this.length)
        this.renderTicks()
    }

    private renderTicks(){
        const tickLength = 5
        stroke(style.color.front)
        push()
        if (this.chartType == "x" ){
            textAlign(CENTER, TOP)
            for(let i = 0; i < this.numOfTicks; i++){
                line(0, tickLength / 2, 0, -tickLength / 2)
                push()
                this.labels[i].render()
                pop()
                translate(this.length  / this.numOfTicks, 0)
            }
        } else{
            textAlign(RIGHT, CENTER)
            for(let i = 0; i < this.numOfTicks; i++){
                line(-tickLength / 2, 0, tickLength / 2, 0)
                push()
                translate(0, -3) // Numbers in style.text.font are not perfectly centered vertically
                this.labels[i].render()
                pop()
                translate(0, - this.length / this.numOfTicks)
            }
        }
        pop()
    }
    
    /**
     * Get the coordinate (x or y) for a given value
     * @param value 
     */
    public getCoorForValue(value: number): number{
        const coor = (value - this.min) / (this.max - this.min) * (this.length)
        return this.chartType == "x" ? coor : -coor
    }

}