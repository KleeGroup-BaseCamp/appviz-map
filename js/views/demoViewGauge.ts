import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {DiscreteCircularProgressBar, Gauge, ContinuousCircularProgressBar, BlackHole} from "../incubator" 
import {PxSize} from "../layout"

export class DemoViewGauge implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100, 100)
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "Demo Gauge"))
                .build(),
            new GridLayerBuilder()
                // .addElement(new Gauge("-1", pxSize, 0))
                // .addElement(new Gauge("-1", pxSize, 33))
                // .addElement(new Gauge("-1", pxSize, 50))
                // .addElement(new Gauge("-1", pxSize, 66))
                // .addElement(new Gauge("-1", pxSize, 100))
                // .beginRow()
                // .addElement(new DiscreteCircularProgressBar("-1", pxSize, 0))
                // .addElement(new DiscreteCircularProgressBar("-1", pxSize, 33))
                // .addElement(new DiscreteCircularProgressBar("-1", pxSize, 50))
                // .addElement(new DiscreteCircularProgressBar("-1", pxSize, 66))
                // .addElement(new DiscreteCircularProgressBar("-1", pxSize, 100))
                // .beginRow()
                // .addElement(new ContinuousCircularProgressBar("-1", pxSize, 0))
                // .addElement(new ContinuousCircularProgressBar("-1", pxSize, 33))
                // .addElement(new ContinuousCircularProgressBar("-1", pxSize, 50))
                // .addElement(new ContinuousCircularProgressBar("-1", pxSize, 66))
                // .addElement(new ContinuousCircularProgressBar("-1", pxSize, 100))
                // .beginRow()
                .addElement(new BlackHole("-1", pxSize, 0))
                // .addElement(new BlackHole("-1", pxSize, 33))
                // .addElement(new BlackHole("-1", pxSize, 50))
                // .addElement(new BlackHole("-1", pxSize, 66))
                // .addElement(new BlackHole("-1", pxSize, 100))
                .build()
            ]
    }
}