import {VElement} from "../../core"
import {PxSize} from "../../layout"
import {LinearAxis} from "."
import {style} from "../../app"

export type ChartData<T extends string | number> = {x: T, y: number}[]

export abstract class Chart extends VElement{
    protected readonly yAxis: LinearAxis
    protected readonly leftPadding: number = 20
    private readonly bottomPadding: number = 20
    private readonly chartHeight: number 
    private readonly chartWidth: number 
    private readonly numOfXTicks = 5
    private readonly numOfYTicks = 5


    constructor(id: any, pxSize: PxSize, data: ChartData<number> | ChartData<string>){
        super(id, pxSize, false)
        const values = (data as ChartData<string | number>).map(entry => entry.y) // ChartData<Union> because map is a generic function
        this.yAxis = new LinearAxis("y", min(values), max(values), 5, pxSize.getHeight() - this.bottomPadding)
        this.chartHeight = this.getHeight() - this.bottomPadding
        this.chartWidth = this.getWidth() - this.leftPadding
    }

    public render(){
        push()
        translate(this.leftPadding, this.chartHeight)
        this.renderGrid()
        this.renderAxes()
        this.renderChart()
        pop()
    }

    protected abstract renderAxes(): void
    protected abstract renderChart(): void

    private renderGrid(){
        stroke(style.color.front)
        strokeWeight(0.3)
        for(let i = 0; i < this.numOfXTicks; i++){
            const x = (i / this.numOfXTicks) * this.chartWidth
            line(x, 0, x, - this.chartHeight)
        }
        for(let j = 0; j < this.numOfYTicks; j++){
            const y = -(j / this.numOfYTicks) * this.chartHeight
            line(0, y, this.chartWidth, y)
        }
    }
}