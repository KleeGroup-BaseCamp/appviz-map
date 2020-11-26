import {PxSize} from "../../layout"
import {CategoryAxis} from "."
import {style} from "../../app"
import {Chart, ChartData} from "./chart"
import {LinearAxis} from "./linearAxis"

export class BarChart extends Chart{
    private readonly xAxis: CategoryAxis
    private readonly yAxis: LinearAxis
    private readonly data: ChartData<string>

    constructor(id: any, pxSize: PxSize, data: ChartData<string>){
        super(id, pxSize, 0, 0)
        const labels = data.map(entry => entry.x)
        const values = data.map(entry => entry.y)
        this.xAxis = new CategoryAxis(labels, this.chartWidth)
        this.yAxis = new LinearAxis("y", min(values), max(values), 5, this.chartHeight)
        this.data = data
    }

    protected renderAxes(){
        this.xAxis.render()
        this.yAxis.render()
    }

    protected renderChart(){
        const values = this.data.map(entry => entry.y)
        if (values.length == 0) return
        stroke(color(255))
        fill(style.color.a)
        strokeWeight(1)
        const barWidth =  this.chartWidth / values.length
        push()
        values.forEach(value => {
            rect(0, 0, barWidth, this.yAxis.getCoorForValue(value))
            translate(barWidth, 0)
        })
        pop()
    }
}