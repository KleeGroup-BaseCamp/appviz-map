import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {BlackHole} from "../incubator" 
import {PxSize} from "../layout"

export class DemoViewGauge2 implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(400, 400)
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "Demo Gauge"))
                .build(),
            new GridLayerBuilder()
                .addElement(new BlackHole("-1", pxSize, 66))
                // .addElement(new BlackHole("-1", pxSize, 33))
                // .addElement(new BlackHole("-1", pxSize, 50))
                // .addElement(new BlackHole("-1", pxSize, 66))
                // .addElement(new BlackHole("-1", pxSize, 100))
                .build()
            ]
    }
}