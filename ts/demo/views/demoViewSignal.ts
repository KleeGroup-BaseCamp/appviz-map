import {View, Layer, LayerBuilder, GridLayerBuilder, WifiSignal, BarsSignal, Caption, Card, PxSize, Projection} from "../../neon"

export class DemoViewSignal implements View {
    private projection : Projection = Projection.buildProjection ()

    public provideLayers(): Layer[] {
        const pxSize = new PxSize(100)
        const captionSize = new PxSize(850, 35)
        return  [
            new LayerBuilder()
                .addComponent(new Card("components/signal", {size: this.projection.getPxSize()}))
                .build(),
            new GridLayerBuilder()
                .addComponent(new WifiSignal(0, {size:pxSize}))
                .addComponent(new WifiSignal(1, {size:pxSize}))
                .addComponent(new WifiSignal(2, {size:pxSize}))
                .addComponent(new WifiSignal(3, {size:pxSize}))
                .addComponent(new WifiSignal(4, {size:pxSize}))
                .addComponent(new WifiSignal(5, {size:pxSize}))
                .beginRow(10)
                .addComponent(new Caption("WifiSignal", {size: captionSize}))
                .beginRow()
                .addComponent(new BarsSignal(0, {size:pxSize}))
                .addComponent(new BarsSignal(1, {size:pxSize}))
                .addComponent(new BarsSignal(2, {size:pxSize}))
                .addComponent(new BarsSignal(3, {size:pxSize}))
                .addComponent(new BarsSignal(4, {size:pxSize}))
                .addComponent(new BarsSignal(5, {size:pxSize}))
                .beginRow(10)
                .addComponent(new Caption("BarsSignal", {size: captionSize}))
                .build()
        ]
    }
}