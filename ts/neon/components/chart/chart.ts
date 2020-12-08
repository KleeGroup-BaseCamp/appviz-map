import {Component, ComponentProps} from "../../core"
import {LinearAxis} from "./linearAxis"
import {neon} from "../../../appViz/app"

export type ChartData<T extends string | number> = {x: T, y: number}[]

export interface ChartProps extends ComponentProps {
    rightPadding?: number, // Merge into padding object ?
    topPadding?: number
}

export abstract class Chart extends Component{
    protected readonly chartHeight: number 
    protected readonly chartWidth: number 
    protected readonly yAxis: LinearAxis
    private readonly leftPadding: number = 20
    private readonly bottomPadding: number = 20
    private readonly numOfXTicks = 5
    private readonly numOfYTicks = 5


    constructor(data: ChartData<number> | ChartData<string>, props: ChartProps){
        super(props, false)
        this.chartWidth = this.getWidth() - this.leftPadding - (props.rightPadding ?? 0)
        this.chartHeight = this.getHeight() - this.bottomPadding - (props.topPadding ?? 0)
        const values = (data as ChartData<string | number>).map(entry => entry.y) // ChartData<Union> because map is a generic function
        this.yAxis = new LinearAxis("y", min(values), max(values), 5, this.chartHeight)
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
        stroke(neon.getStyle().color.front)
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