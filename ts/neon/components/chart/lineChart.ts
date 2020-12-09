import {PxPosition} from "../../layout"
import {ComponentProps} from "../../core"
import {LinearAxis} from "./linearAxis"
import {Chart, ChartData} from "./chart"
import { ColorUtils } from "../../utils"

export interface LineChartProps extends ComponentProps {
    fill?: boolean
}

export class LineChart extends Chart{
    private readonly xAxis: LinearAxis
    private readonly data: ChartData<number>
    private readonly pointRadius: number
    private readonly fill: boolean

    constructor(data: ChartData<number>, props: LineChartProps){
        const pointRadius = 5
        super(data, {
            ...props, 
            rightPadding: pointRadius,
            topPadding: pointRadius
        })
        this.pointRadius = pointRadius
        this.fill = props.fill ?? false
        const xValues = data.map(entry => entry.x)
        this.xAxis = new LinearAxis("x", min(xValues), max(xValues), 5, this.chartWidth)
        this.data = data
    }

    protected renderAxes(){
        this.xAxis.render()
        this.yAxis.render()
    }

    protected renderChart(){
        const color = ColorUtils.clone(this.style.color.a)
        strokeWeight(1)
        noFill()
        stroke(color)
        // We need two shapes to avoid having the stroke between first point and vertex(0,0) 
        // (same for last point and vertex(this.getHeight() - this.leftPadding, 0))
        if(this.fill){
            beginShape()
            vertex(0, 0)
        }
        fill(this.style.color.a) // Fill for the circles
        beginShape()
        for (let entry of this.data){
            const position = new PxPosition(
                this.xAxis.getCoorForValue(entry.x), 
                this.yAxis.getCoorForValue(entry.y)
                )
                circle(position.getX(), position.getY(), this.pointRadius)
                vertex(position.getX(), position.getY())
            }
        noFill() // Because of the fill for the circles
        endShape()
        if(this.fill){
            noStroke()
            color.setAlpha(50)
            fill(color)
            vertex(this.chartWidth, 0)
            endShape()
        }
    }
}