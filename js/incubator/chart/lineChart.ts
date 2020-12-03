import {PxPosition, PxSize} from "../../neon/layout"
import {LinearAxis} from "./linearAxis"
import {style} from "../../app"
import {Chart, ChartData} from "./chart"
import { ColorUtils } from "../../neon/utils"

export class LineChart extends Chart{
    private readonly xAxis: LinearAxis
    private readonly data: ChartData<number>
    private readonly pointRadius: number
    private fill: boolean

    constructor(id: any, pxSize: PxSize, data: ChartData<number>){
        const pointRadius = 5
        super(id, pxSize, data, pointRadius, pointRadius)
        this.pointRadius = pointRadius
        this.fill = false
        const xValues = data.map(entry => entry.x)
        this.xAxis = new LinearAxis("x", min(xValues), max(xValues), 5, this.chartWidth)
        this.data = data
    }

    protected renderAxes(){
        this.xAxis.render()
        this.yAxis.render()
    }

    protected renderChart(){
        const color = ColorUtils.clone(style.color.a)
        strokeWeight(1)
        noFill()
        stroke(color)
        // We need two shapes to avoid having the stroke between first point and vertex(0,0) 
        // (same for last point and vertex(this.getHeight() - this.leftPadding, 0))
        if(this.fill){
            beginShape()
            vertex(0, 0)
        }
        fill(style.color.a) // Fill for the circles
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

    /**
     * Pass all options as an object
     * @param options 
     */
    public withOptions(options: {fill?: boolean}): LineChart{
        if(options.fill) this.fill = options.fill
        return this
    }
}