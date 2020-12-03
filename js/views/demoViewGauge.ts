import {projection, style} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {StripedGauge, ArrowGauge, Gauge, Caption} from "../incubator" 
import {PxSize} from "../layout"

export class DemoViewGauge implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(150)
        const captionpxSize = new PxSize(950, 35)
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "elements/gauge"))
                .build(),
            new GridLayerBuilder()
                .addElement(new ArrowGauge("-1", pxSize, 0))
                .addElement(new ArrowGauge("-1", pxSize, 33))
                .addElement(new ArrowGauge("-1", pxSize, 50))
                .addElement(new ArrowGauge("-1", pxSize, 66))
                .addElement(new ArrowGauge("-1", pxSize, 100))
                .beginRow(10)
                .addElement(new Caption("-1", captionpxSize, "ArrowGauge"))
                .beginRow()
                .addElement(new StripedGauge("-1", pxSize, 0))
                .addElement(new StripedGauge("-1", pxSize, 33))
                .addElement(new StripedGauge("-1", pxSize, 50))
                .addElement(new StripedGauge("-1", pxSize, 66))
                .addElement(new StripedGauge("-1", pxSize, 100))
                .beginRow(10)
                .addElement(new Caption("-1", captionpxSize, "StripedGauge"))
                .beginRow()
                .addElement(new Gauge("-1", pxSize, 0))
                .addElement(new Gauge("-1", pxSize, 33)
                    .withFirstColor(style.color.b))
                .addElement(new Gauge("-1", pxSize, 50)
                    .withFirstColor(style.color.a)
                    .withSecondColor(style.color.c))
                .addElement(new Gauge("-1", pxSize, 66))
                .addElement(new Gauge("-1", pxSize, 100))
                .beginRow(10)
                .addElement(new Caption("-1", captionpxSize, "Gauge"))
                .build()
            ]
    }
}