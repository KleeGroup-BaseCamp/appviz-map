import { VElement } from "../../core";
import { PxSize } from "../../layout";
import { XLinearAxis, YLinearAxis } from ".";

export class LineChart extends VElement{
    private readonly xAxis: XLinearAxis
    private readonly yAxis: YLinearAxis
    private readonly leftPadding: number = 20
    private readonly bottomPadding: number = 20


    constructor(id: any, pxSize: PxSize){
        super(id, pxSize, false)
        this.xAxis = new XLinearAxis(0, 100, pxSize.getWidth() - this.leftPadding)
        this.yAxis = new YLinearAxis(0, 100, pxSize.getHeight() - this.bottomPadding)
    }

    public render(){
        push()
        translate(this.leftPadding, this.getHeight() - this.bottomPadding)
        this.xAxis.render()
        this.yAxis.render()
        pop()

    }
}