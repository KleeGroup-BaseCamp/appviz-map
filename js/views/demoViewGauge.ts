import {projection, style} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {StripedGauge, Gauge, BiColorGauge, Caption} from "../incubator" 
import {PxSize} from "../layout"

export class DemoViewGauge implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(150, 150)
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "Demo Gauge"))
                .build(),
            new GridLayerBuilder()
                .addElement(new Gauge("-1", pxSize, 0))
                .addElement(new Gauge("-1", pxSize, 33))
                .addElement(new Gauge("-1", pxSize, 50))
                .addElement(new Gauge("-1", pxSize, 66))
                .addElement(new Gauge("-1", pxSize, 100))
                .beginRow()
                .addElement(new Caption("-1", new PxSize(950, 50), "Gauge"))
                .beginRow()
                .addElement(new StripedGauge("-1", pxSize, 0))
                .addElement(new StripedGauge("-1", pxSize, 33))
                .addElement(new StripedGauge("-1", pxSize, 50))
                .addElement(new StripedGauge("-1", pxSize, 66))
                .addElement(new StripedGauge("-1", pxSize, 100))
                .beginRow()
                .addElement(new Caption("-1", new PxSize(950, 50), "StripedGauge"))
                .beginRow()
                .addElement(new BiColorGauge("-1", pxSize, 0))
                .addElement(new BiColorGauge("-1", pxSize, 33).withColors(style.color.b))
                .addElement(new BiColorGauge("-1", pxSize, 50).withColors(style.color.a, style.color.c))
                .addElement(new BiColorGauge("-1", pxSize, 66))
                .addElement(new BiColorGauge("-1", pxSize, 100))
                .beginRow()
                .addElement(new Caption("-1", new PxSize(950, 50), "BiColorGauge"))
                .build()
            ]
    }
}