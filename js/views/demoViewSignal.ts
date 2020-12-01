import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {Signal, SignalBars, Caption} from "../incubator" 
import {PxSize} from "../layout"

export class DemoViewSignal implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100)
        const pxSize2 = new PxSize(100, 50) // For testing bounding boxes
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "elements/signal"))
                .build(),
            new GridLayerBuilder()
                .addElement(new Signal("-1", pxSize, 0))
                .addElement(new Signal("-1", pxSize, 1))
                .addElement(new Signal("-1", pxSize, 2))
                .addElement(new Signal("-1", pxSize, 3))
                .addElement(new Signal("-1", pxSize, 4))
                .addElement(new Signal("-1", pxSize, 5))
                .beginRow(10)
                .addElement(new Caption("-1", new PxSize(850, 35), "Signal"))
                .beginRow()
                .addElement(new SignalBars("-1", pxSize, 0))
                .addElement(new SignalBars("-1", pxSize, 1))
                .addElement(new SignalBars("-1", pxSize, 2))
                .addElement(new SignalBars("-1", pxSize, 3))
                .addElement(new SignalBars("-1", pxSize, 4))
                .addElement(new SignalBars("-1", pxSize, 5))
                .beginRow(10)
                .addElement(new Caption("-1", new PxSize(850, 35), "SignalBars"))
                .build()
        ]
    }
}