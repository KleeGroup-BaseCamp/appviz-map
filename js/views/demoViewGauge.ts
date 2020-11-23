import {projection, style} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {StripedGauge, Gauge, BiColorGauge, CaptionedElement} from "../incubator" 
import {PxSize} from "../layout"

export class DemoViewGauge implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(150, 150)
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "Demo Gauge"))
                .build(),
            new GridLayerBuilder()
                .addElement(new CaptionedElement("-1", new Gauge("-1", pxSize, 0)))
                .addElement(new CaptionedElement("-1", new Gauge("-1", pxSize, 33)))
                .addElement(new CaptionedElement("-1", new Gauge("-1", pxSize, 50)))
                .addElement(new CaptionedElement("-1", new Gauge("-1", pxSize, 66)))
                .addElement(new CaptionedElement("-1", new Gauge("-1", pxSize, 100)))
                .beginRow()
                .addElement(new CaptionedElement("-1", new StripedGauge("-1", pxSize, 0)))
                .addElement(new CaptionedElement("-1", new StripedGauge("-1", pxSize, 33)))
                .addElement(new CaptionedElement("-1", new StripedGauge("-1", pxSize, 50)))
                .addElement(new CaptionedElement("-1", new StripedGauge("-1", pxSize, 66)))
                .addElement(new CaptionedElement("-1", new StripedGauge("-1", pxSize, 100)))
                .beginRow()
                .addElement(new CaptionedElement("-1", new BiColorGauge("-1", pxSize, 0)))
                .addElement(new CaptionedElement("-1", new BiColorGauge("-1", pxSize, 33).withColors(style.color.b)))
                .addElement(new CaptionedElement("-1", new BiColorGauge("-1", pxSize, 50).withColors(style.color.a, style.color.c)))
                .addElement(new CaptionedElement("-1", new BiColorGauge("-1", pxSize, 66)))
                .addElement(new CaptionedElement("-1", new BiColorGauge("-1", pxSize, 100)))
                .build()
            ]
    }
}