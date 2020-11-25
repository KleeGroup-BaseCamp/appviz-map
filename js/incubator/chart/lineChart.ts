import {PxPosition, PxSize} from "../../layout"
import {LinearAxis} from "./linearAxis"
import {style} from "../../app"
import {Chart, ChartData} from "./chart"

export class LineChart extends Chart{
    private readonly xAxis: LinearAxis
    private readonly data: ChartData<number>

    constructor(id: any, pxSize: PxSize, data: ChartData<number>){
        super(id, pxSize, data)
        const xValues = data.map(entry => entry.x)
        this.xAxis = new LinearAxis("x", min(xValues), max(xValues), 5, pxSize.getWidth() - this.leftPadding)
        this.data = data
    }

    protected renderAxes(){
        this.xAxis.render()
        this.yAxis.render()
    }

    protected renderChart(){
        stroke(style.color.a)
        fill(style.color.a)
        strokeWeight(1)
        let prevPointPos: PxPosition | null = null
        for (let entry of this.data){
            const position = new PxPosition(
                this.xAxis.getCoorForValue(entry.x), 
                this.yAxis.getCoorForValue(entry.y)
                )
            circle(position.getX(), position.getY(), 5)
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
}