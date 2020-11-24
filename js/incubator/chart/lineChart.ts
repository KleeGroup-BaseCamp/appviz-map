import { VElement } from "../../core";
import { PxSize } from "../../layout";
import { XLinearAxis, YLinearAxis } from ".";
import { style } from "../../app";

export type lineChartData = {x: number, y: number}[]
export class LineChart extends VElement{
    private readonly xAxis: XLinearAxis
    private readonly yAxis: YLinearAxis
    private readonly leftPadding: number = 20
    private readonly bottomPadding: number = 20
    private readonly data: lineChartData


    constructor(id: any, pxSize: PxSize, data: lineChartData){
        super(id, pxSize, false)
        const xValues = data.map(point => point.x)
        const yValues = data.map(point => point.y)
        this.xAxis = new XLinearAxis(min(xValues), max(xValues), pxSize.getWidth() - this.leftPadding)
        this.yAxis = new YLinearAxis(min(yValues), max(yValues), pxSize.getHeight() - this.bottomPadding)
        this.data = data
    }

    public render(){
        push()
        translate(this.leftPadding, this.getHeight() - this.bottomPadding)
        this.xAxis.render()
        this.yAxis.render()
        this.renderChart()
        pop()
    }

    private renderChart(){
        noStroke()
        fill(style.color.a)
        for (let point of this.data){
            circle(
                this.xAxis.getCoorForValue(point.x), 
                this.yAxis.getCoorForValue(point.y), 
                5
            )
        }
    }
}