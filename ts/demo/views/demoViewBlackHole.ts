import {View, Layer, LayerBuilder, GridLayerBuilder, Card, PxSize, Caption} from "../../neon"
import {BlackHole2, BlackHole3, BlackHole4} from "../../demo"

export class DemoViewBlackHole implements View {

    public provideLayers(): Layer[] {
        const pxSize = new PxSize(200, 200)
        const captionSize = new PxSize(200, 35)
        return  [
            new LayerBuilder()
                .addComponent(new Card("components/gauge 2", {}))
                .build(),
            new GridLayerBuilder()
                .addComponent(new BlackHole4(66, {size: pxSize}))
                .beginRow(10)
                .addComponent(new Caption("BlackHole 4", {size: captionSize}))
                .beginRow()
                .addComponent(new BlackHole2({size: pxSize}))
                .addComponent(new BlackHole3({size: pxSize}))
                .beginRow(10)
                .addComponent(new Caption("BlackHole 2", {size: captionSize}))
                .addComponent(new Caption("BlackHole 3", {size: captionSize}))
                .build()
            ]
    }
}