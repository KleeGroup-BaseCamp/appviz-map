import {projection} from "../app"
import {n3on} from "../../neon"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder, StripedGauge, ArrowGauge, Gauge, Caption, Card, PxSize} from "../../neon"
import {ModelRepository} from "../model"
import {Layout} from "../types"

export class DemoViewGauge implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(150)
        const captionSize = new PxSize(950, 35)
        return  [
            new LayerBuilder()
                .addComponent(new Card("components/gauge", {size: projection.getPxSize()}))
                .build(),
            new GridLayerBuilder()
                .addComponent(new ArrowGauge(0, {size:pxSize}))
                .addComponent(new ArrowGauge(33, {size:pxSize}))
                .addComponent(new ArrowGauge(50, {size:pxSize}))
                .addComponent(new ArrowGauge(66, {size:pxSize}))
                .addComponent(new ArrowGauge(100, {size:pxSize}))
                .beginRow(10)
                .addComponent(new Caption("ArrowGauge", {size: captionSize}))
                .beginRow()
                .addComponent(new StripedGauge(0, {size:pxSize}))
                .addComponent(new StripedGauge(33, {size:pxSize}))
                .addComponent(new StripedGauge(50, {size:pxSize}))
                .addComponent(new StripedGauge(66, {size:pxSize}))
                .addComponent(new StripedGauge(100, {size:pxSize}))
                .beginRow(10)
                .addComponent(new Caption("StripedGauge", {size: captionSize}))
                .beginRow()
                .addComponent(new Gauge(0, {size:pxSize}))
                .addComponent(new Gauge(33, {
                        size: pxSize, 
                        firstColor : n3on.getStyle().color.b}))
                .addComponent(new Gauge(50, {
                        size:pxSize, 
                        firstColor : n3on.getStyle().color.a,
                        secondColor : n3on.getStyle().color.c}))
                .addComponent(new Gauge(66, {size:pxSize}))
                .addComponent(new Gauge(100, {size:pxSize}))
                .beginRow(10)
                .addComponent(new Caption("Gauge", {size: captionSize}))
                .build()
            ]
    }
}