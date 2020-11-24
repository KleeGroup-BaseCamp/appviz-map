import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {LineChart} from "../incubator" 
import {PxSize} from "../layout"

export class DemoViewGraph implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(200, 200)
        const data = [{x: 0, y: 0}, {x: 20, y: 40}, {x:40, y: 80}, {x: 100, y: 100}]
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "Demo Gauge"))
                .build(),
            new GridLayerBuilder()
                .addElement(new LineChart("-1", pxSize, data))
                .build()
            ]
    }
}