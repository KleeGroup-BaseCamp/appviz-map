import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {Caption, LineChart, BarChart} from "../incubator" 
import {PxSize} from "../layout"

export class DemoViewChart implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(200, 200)
        const lineData = [{x: 0, y: 0}, {x: 20, y: 40}, {x:40, y: 80}, {x:60, y: 20}, {x: 100, y: 100}]
        const barData = [{x: "Jan", y: 0}, {x: "Feb", y: 40}, {x: "Mar", y: 80}, {x: "Apr", y: 20}, {x: "May", y: 100}]
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "elements/chart"))
                .build(),
            new GridLayerBuilder()
                .addElement(new LineChart("-1", pxSize, lineData))
                .addElement(new BarChart("-1", pxSize, barData))
                .beginRow(10)
                .addElement(new Caption("-1", new PxSize(200, 35), "Line chart"))
                .addElement(new Caption("-1", new PxSize(200, 35), "Bar chart"))
                .build()
            ]
    }
}