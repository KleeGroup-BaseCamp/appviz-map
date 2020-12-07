import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../neon"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {Caption, LineChart, BarChart, DonutChart} from "../neon" 
import {PxSize} from "../neon"

export class DemoViewChart implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(200, 200)
        const lineData = [{x: 0, y: 0}, {x: 20, y: 40}, {x:40, y: 80}, {x:60, y: 20}, {x: 100, y: 100}]
        const barData = [{x: "Jan", y: 0}, {x: "Feb", y: 40}, {x: "Mar", y: 80}, {x: "Apr", y: 20}, {x: "May", y: 100}]
        const donutData = [{label: "label1", value: 50}, {label: "label2", value: 100}, {label: "label3", value: 50}]
        const captionSize = new PxSize(200, 35)
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "elements/chart"))
                .build(),
            new GridLayerBuilder()
                .addElement(new LineChart("-1", pxSize, lineData).withOptions({fill: false}))
                .addElement(new LineChart("-1", pxSize, lineData).withOptions({fill: true}))
                .addElement(new BarChart("-1", pxSize, barData))
                .addElement(new DonutChart("-1", pxSize, donutData))
                .beginRow(10)
                .addElement(new Caption({text: "Line chart", size: captionSize}))
                .addElement(new Caption({text: "Filled line chart", size: captionSize}))
                .addElement(new Caption({text: "Bar chart", size: captionSize}))
                .addElement(new Caption({text: "Donut chart", size: captionSize}))
                .build()
            ]
    }
}