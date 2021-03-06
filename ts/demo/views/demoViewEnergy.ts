import {View, Layer, LayerBuilder, GridLayerBuilder, Battery, Caption, Light, Card, PxSize} from "../../neon"

export class DemoViewEnergy implements View {
    public provideLayers(): Layer[] {
        const pxSize = new PxSize(100, 150)
        const captionSize = new PxSize(550, 35)
        return  [
            new LayerBuilder()
                .addComponent(new Card("components/energy", {}))
                .build(),
            new GridLayerBuilder()
                .addComponent(new Battery(15, {size: pxSize}))
                .addComponent(new Battery(50, {size: pxSize}))
                .addComponent(new Battery(75, {size: pxSize}))
                .addComponent(new Battery(100, {size: pxSize}))
                .beginRow(10)
                .addComponent(new Caption("Battery", {size: captionSize}))
                .beginRow()
                .addComponent(new Light(25, {size: pxSize}))
                .addComponent(new Light(50, {size: pxSize}))
                .addComponent(new Light(75, {size: pxSize, color: color('cyan')}))
                .addComponent(new Light(100, {size: pxSize}))
                .beginRow(10)
                .addComponent(new Caption("Light", {size: captionSize}))
                .build()
        ]
    }
}