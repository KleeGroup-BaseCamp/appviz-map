import { VElement } from "../../core";
import { PxSize } from "../../layout";
import { XAxis } from "./xAxis";

export class Chart extends VElement{
    private readonly xAxis: XAxis


    constructor(id: any, pxSize: PxSize){
        super(id, pxSize, false)
        this.xAxis = new XAxis(0, 100, pxSize.getWidth())
    }

    public render(){
        this.xAxis.render()
    }
}