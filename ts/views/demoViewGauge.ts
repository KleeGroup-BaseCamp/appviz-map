import {projection, style} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../neon"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {StripedGauge, ArrowGauge, Gauge, Caption} from "../neon" 
import {PxSize} from "../neon"

export class DemoViewGauge implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(150)
        const captionSize = new PxSize(950, 35)
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "elements/gauge"))
                .build(),
            new GridLayerBuilder()
                .addElement(new ArrowGauge(0, {size:pxSize}))
                .addElement(new ArrowGauge(33, {size:pxSize}))
                .addElement(new ArrowGauge(50, {size:pxSize}))
                .addElement(new ArrowGauge(66, {size:pxSize}))
                .addElement(new ArrowGauge(100, {size:pxSize}))
                .beginRow(10)
                .addElement(new Caption("ArrowGauge", {size: captionSize}))
                .beginRow()
                .addElement(new StripedGauge(0, {size:pxSize}))
                .addElement(new StripedGauge(33, {size:pxSize}))
                .addElement(new StripedGauge(50, {size:pxSize}))
                .addElement(new StripedGauge(66, {size:pxSize}))
                .addElement(new StripedGauge(100, {size:pxSize}))
                .beginRow(10)
                .addElement(new Caption("StripedGauge", {size: captionSize}))
                .beginRow()
                .addElement(new Gauge(0, {size:pxSize}))
                .addElement(new Gauge(33, {
                        size: pxSize, 
                        firstColor : style.color.b}))
                .addElement(new Gauge(50, {
                        size:pxSize, 
                        firstColor : style.color.a,
                        secondColor : style.color.c}))
                .addElement(new Gauge(66, {size:pxSize}))
                .addElement(new Gauge(100, {size:pxSize}))
                .beginRow(10)
                .addElement(new Caption("Gauge", {size: captionSize}))
                .build()
            ]
    }
}