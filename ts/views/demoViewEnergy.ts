import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder, Battery, Caption, Light, Card, PxSize} from "../neon"
import {ModelRepository} from "../model"
import {Layout} from "../types"

export class DemoViewEnergy implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100, 150)
        const captionSize = new PxSize(550, 35)
        return  [
            new LayerBuilder()
                .addComponent(new Card("components/energy", {size: projection.getPxSize()}))
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