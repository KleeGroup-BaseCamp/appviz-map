import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../neon"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {WifiSignal, BarsSignal, Caption} from "../neon" 
import {PxSize} from "../neon"

export class DemoViewSignal implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100)
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "elements/signal"))
                .build(),
            new GridLayerBuilder()
                .addElement(new WifiSignal("-1", pxSize, 0))
                .addElement(new WifiSignal("-1", pxSize, 1))
                .addElement(new WifiSignal("-1", pxSize, 2))
                .addElement(new WifiSignal("-1", pxSize, 3))
                .addElement(new WifiSignal("-1", pxSize, 4))
                .addElement(new WifiSignal("-1", pxSize, 5))
                .beginRow(10)
                .addElement(new Caption("-1", new PxSize(850, 35), "WifiSignal"))
                .beginRow()
                .addElement(new BarsSignal("-1", pxSize, 0))
                .addElement(new BarsSignal("-1", pxSize, 1))
                .addElement(new BarsSignal("-1", pxSize, 2))
                .addElement(new BarsSignal("-1", pxSize, 3))
                .addElement(new BarsSignal("-1", pxSize, 4))
                .addElement(new BarsSignal("-1", pxSize, 5))
                .beginRow(10)
                .addElement(new Caption("-1", new PxSize(850, 35), "BarsSignal"))
                .build()
        ]
    }
}