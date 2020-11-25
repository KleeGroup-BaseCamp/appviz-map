import { VElement } from "../../core";
import { PxPosition, PxSize } from "../../layout";
import { XLinearAxis, YLinearAxis } from ".";
import { style } from "../../app";

export type lineChartData = {x: number, y: number}[]
export class LineChart extends VElement{
    private readonly xAxis: XLinearAxis
    private readonly yAxis: YLinearAxis
    private readonly chartHeight: number 
    private readonly chartWidth: number 
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
        this.chartHeight = this.getHeight() - this.bottomPadding
        this.chartWidth = this.getWidth() - this.leftPadding
    }

    public render(){
        push()
        translate(this.leftPadding, this.chartHeight)
        this.xAxis.render()
        this.yAxis.render()
        this.renderChart()
        this.renderGrid()
        pop()
    }

    private renderChart(){
        stroke(style.color.a)
        fill(style.color.a)
        let prevPointPos: PxPosition | null = null
        for (let point of this.data){
            const position = new PxPosition(
                this.xAxis.getCoorForValue(point.x), 
                this.yAxis.getCoorForValue(point.y)
                )
            circle(
                position.getX(), 
                position.getY(), 
                5
            )
            if (prevPointPos){
                line( // --> TO DO: use shape to handle fill case
                    position.getX(), 
                    position.getY(), 
                    prevPointPos.getX(), 
                    prevPointPos.getY()
                )
            } 
            prevPointPos = position
        }
    }

    private renderGrid(){
        stroke(style.color.front)
        strokeWeight(0.3)
        const xNumOfTicks = this.xAxis.getNumOfTicks()
        const yNumOfTicks = this.yAxis.getNumOfTicks()
        for(let i = 0; i < xNumOfTicks; i++){
            const x = (i / xNumOfTicks) * this.chartWidth
            line(x, 0, x, - this.chartHeight)
        }
        for(let j = 0; j < yNumOfTicks; j++){
            const y = -(j / yNumOfTicks) * this.chartHeight
            line(0, y, this.chartWidth, y)
        }
    }
}