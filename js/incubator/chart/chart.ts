import {VElement} from "../../core"
import {PxSize} from "../../layout"
import {LinearAxis} from "."
import {style} from "../../app"

export type ChartData<T extends string | number> = {x: T, y: number}[]

export abstract class Chart extends VElement{
    protected readonly chartHeight: number 
    protected readonly chartWidth: number 
    private readonly leftPadding: number = 20
    private readonly bottomPadding: number = 20
    private readonly numOfXTicks = 5
    private readonly numOfYTicks = 5


    constructor(id: any, pxSize: PxSize, rightPadding: number, topPadding: number){
        super(id, pxSize, false)
        this.chartWidth = this.getWidth() - this.leftPadding - rightPadding
        this.chartHeight = this.getHeight() - this.bottomPadding - topPadding
    }

    public render(){
        push()
        translate(this.leftPadding, this.getHeight() - this.bottomPadding)
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