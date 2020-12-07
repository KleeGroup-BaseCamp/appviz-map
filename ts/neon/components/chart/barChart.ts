import {CategoryAxis} from "./categoryAxis"
import {style} from "../../../app"
import {Chart, ChartData} from "./chart"
import {ColorUtils} from "../../utils"
import { ComponentProps } from "../../core"

export class BarChart extends Chart{
    private readonly xAxis: CategoryAxis
    private readonly data: ChartData<string>

    constructor(data: ChartData<string>, props: ComponentProps){
        super(data, {
            ...props, 
            rightPadding: 0,
            topPadding: 0
        })
        const labels = data.map(entry => entry.x)
        this.xAxis = new CategoryAxis(labels, this.chartWidth)
        this.data = data
    }

    protected renderAxes(){
        this.xAxis.render()
        this.yAxis.render()
    }

    protected renderChart(){
        const values = this.data.map(entry => entry.y)
        if (values.length == 0) return
        noStroke()
        const color = ColorUtils.clone(style.color.a)
        color.setAlpha(150)
        fill(color)
        strokeWeight(1)
        const barWidthRatio = 0.8
        const labelWidth =  this.chartWidth / values.length
        const barWidth = labelWidth * barWidthRatio
        push()
        translate(barWidth * (1 - barWidthRatio), 0)
        values.forEach(value => {
            rect(0, 0, barWidth, this.yAxis.getCoorForValue(value))
            translate(labelWidth, 0)
        })
        pop()
    }
}