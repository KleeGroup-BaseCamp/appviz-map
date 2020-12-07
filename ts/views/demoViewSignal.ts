import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder, WifiSignal, BarsSignal, Caption, Card, PxSize} from "../neon"
import {ModelRepository} from "../model"
import {Layout} from "../types"

export class DemoViewSignal implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100)
        const captionSize = new PxSize(850, 35)
        return  [
            new LayerBuilder()
                .addElement(new Card("elements/signal", {size: projection.getPxSize()}))
                .build(),
            new GridLayerBuilder()
                .addElement(new WifiSignal(0, {size:pxSize}))
                .addElement(new WifiSignal(1, {size:pxSize}))
                .addElement(new WifiSignal(2, {size:pxSize}))
                .addElement(new WifiSignal(3, {size:pxSize}))
                .addElement(new WifiSignal(4, {size:pxSize}))
                .addElement(new WifiSignal(5, {size:pxSize}))
                .beginRow(10)
                .addElement(new Caption("WifiSignal", {size: captionSize}))
                .beginRow()
                .addElement(new BarsSignal(0, {size:pxSize}))
                .addElement(new BarsSignal(1, {size:pxSize}))
                .addElement(new BarsSignal(2, {size:pxSize}))
                .addElement(new BarsSignal(3, {size:pxSize}))
                .addElement(new BarsSignal(4, {size:pxSize}))
                .addElement(new BarsSignal(5, {size:pxSize}))
                .beginRow(10)
                .addElement(new Caption("BarsSignal", {size: captionSize}))
                .build()
        ]
    }
}